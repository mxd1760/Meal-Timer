import {v4 as uuid} from "uuid"
import {times,periods} from "./Times"

export function getTotalTime(recipe){
  let totalTime= 0;
  for(let s of recipe.tasks){
    totalTime+=s.time;
  }
  return totalTime;
}

export function channelAvailable(stepChannel,occupiedChannels,channelSettings){
  // console.log(stepChannel)
  // console.log("Occupied Channels: length->"+ occupiedChannels.length)
  // for(let elem of occupiedChannels){
  //   console.log(elem)
  // }
  // console.log(channelSettings)
  let usedChannelsTally = {}
  for(let name in channelSettings){
    usedChannelsTally[name] = 0;
  }
  for(let elem of occupiedChannels){
    usedChannelsTally[elem.channel] += 1;
  }
  // console.log(usedChannelsTally)
  let out = usedChannelsTally[stepChannel.name] < channelSettings[stepChannel.name]
  // console.log(out)
  return out;
}

export function formatDelay(t_minus){
  let hours = 0;
  while(t_minus>=60){
    t_minus -= 60;
    hours += 1;
  }
  return `${hours}:${t_minus}`
}

export function formatTime(t_minus,time,period){
  while(t_minus>=60){
    t_minus -= 60;
    time -= 1;
    if(time<0){
      time=11;
      period= period==0?1:0;
    }
  }
  if(t_minus ==0){
    return `${times[time]}:00 ${periods[period]}`;
  }else{
    time -= 1;
    if(time<0){
      time=11;
    }
    return `${times[time]}:${60-t_minus} ${periods[period]}`
  }
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
  console.log("calculating recipe")
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
    for(let h of huristics){
      if(h.lastStep!=-1){
        // let ca = 
        // console.log(occupiedChannels)
        // console.log(recipes[h.key].tasks[h.lastStep])
        // console.log(ca)
        let recipeAvailable = true
        for(let elem of occupiedChannels){
          if(elem.recipeKey == h.key){
            recipeAvailable = false;
          }
        }
        if(recipeAvailable && channelAvailable(recipes[h.key].tasks[h.lastStep].channel,occupiedChannels,channelSettings)){
          let timeTaken = recipes[h.key].tasks[h.lastStep].time
          let startTime = timeTally + timeTaken
          out.push({
            step:recipes[h.key].tasks[h.lastStep],
            endTime:timeTally,
            startTime:startTime,
            done:false,
          })
          occupiedChannels.push({
            channel:recipes[h.key].tasks[h.lastStep].channel.name,
            freedTime:startTime,
            recipeKey:h.key
          })
          h.remainingTime -= timeTaken;
          h.lastStep -= 1
        }
      }
    }
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
  out.sort((a,b)=>b.startTime-a.startTime);
  return out;
}

/*
  for each recipe
    if next ste
*/