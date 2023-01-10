import {v4 as uuid} from "uuid"

export function getTotalTime(recipe){
  let totalTime= 0;
  for(let s of recipe.tasks){
    totalTime+=s.time;
  }
  return totalTime;
}

export function channelAvailable(stepChannel,occupiedChannels,channelSettings){
  let channelSettingsCopy = {}
  for(let channel in channelSettings){
    channelSettingsCopy[channel] = channelSettings[channel];
  }
  for(let elem of occupiedChannels){
    channelSettingsCopy[elem.channel] -= 1;
  }
  let out = channelSettingsCopy[stepChannel] >= 1
  return out;
}

/* obj template
  {
    step: <step>
    startTime: <num>
    endTime: <num>
    done:false
  }
*/
export function calculateRecipeStepOrder1(recipes){
  let out = [];

  for(let r of recipes){
    if(r.tasks){
      let timeTotal = 0;
      let prevKey = null;
      for(let i = r.tasks.length-1; i>=0; i--){
        let newTimeTotal = timeTotal + r.tasks[i].time
        let newKey = uuid()
        if(prevKey){
          for(let x of out){
            if(x.key==prevKey){
              x.dependants.push(newKey)
              break;
            }
          }
        }
        out.push({
          key:newKey,
          step: r.tasks[i],
          endTime:timeTotal,
          startTime:newTimeTotal,
          done:false,
          dependants:[]
        })
        timeTotal = newTimeTotal
      }
    }
  }
  out.sort((a,b)=>b.startTime-a.startTime);
  return out;
}

export function calculateRecipeStepOrder(recipes,channelSettings){
  let out = [];
  let huristics = [];
  for(let i=0;i<recipes.length;i++){
    huristics.push({
      key:i,
      lastStep:recipes[i].tasks.length-1,
      remainingTime:getTotalTime(recipes[i]),
    });
  }
  let timeTally = 0;
  let occupiedChannels = [];
  while(huristics.filter((e)=>e.lastStep!=-1).length){ // while steps remain tracked by huristics
    huristics.sort((a,b)=>b.remainingTime-a.remainingTime)
    for(let i = 0; i<occupiedChannels.length;i++){
      if(timeTally>=occupiedChannels[i].freedTime){
        occupiedChannels.splice(i,1)
      }
    }
    let minUpdateTime=Infinity;
    for(let h of huristics){
      if(h.lastStep!=-1){
        if(channelAvailable(recipes[h.key].tasks[h.lastStep].channel,occupiedChannels,channelSettings)){
          let timeTaken = recipes[h.key].tasks[h.lastStep].time
          let startTime = timeTally + timeTaken
          out.push({
            step:recipes[h.key].tasks[h.lastStep],
            endTime:timeTally,
            startTime:startTime,
            done:false,
          })
          occupiedChannels.push({
            channel:recipes[h.key].tasks[h.lastStep].channel,
            freedTime:startTime,
          })
          if(timeTaken<minUpdateTime){
            minUpdateTime = timeTaken;
          }
          h.remainingTime -= timeTaken;
          h.lastStep -= 1
        }
      }
    }
    if(minUpdateTime != Infinity){
      timeTally+=minUpdateTime
    }else{
      // wait for a channel to be fred
      let minChannelFreedTime = Infinity
      for(let elem of occupiedChannels){
        if(elem.freedTime<minChannelFreedTime){
          minChannelFreedTime = elem.freedTime;
        }
      }
      if(minChannelFreedTime != Infinity){
        timeTally = minChannelFreedTime;
      }
      else{
        throw console.error("Time error");
      }
    }
  }
  out.sort((a,b)=>b.startTime-a.startTime);
  return out;
}

/*
  for each recipe
    if next ste
*/