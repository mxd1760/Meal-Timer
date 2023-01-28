import {useEffect, useState} from "react"
import RecipeTaskItem from "../Com/RecipeTaskItem"
import {Content, Back, SmallTitle, MyList,Footer} from "../Com/StyleComps"
import {calculateRecipeStepOrder,formatTime} from "../Util/RecipeCalcFunctions"
import { defaultChannelSettings } from "../Enums/Channel.enum"


export default function({back,time,period,recipes,channelSettings=defaultChannelSettings}){
  let [orderedSteps,setOrderedSteps] = useState([])
  useEffect(()=>{
    setOrderedSteps(calculateRecipeStepOrder(recipes,channelSettings))
  },[]);

  const setDone = (step)=>{

    for(let i=0;i<orderedSteps.length;i++){
      if(orderedSteps[i].step.key==step.key){
        setOrderedSteps(orderedSteps.map((item,n)=>{
          if(n==i){
            let newItem = item;
            newItem.done = true
            return newItem
          }
          return item
        }))
        return
      }
    }
  }

  const activeSteps = []
  const doneSteps = []
  for(let i = 0;i<orderedSteps.length;i++){
    if(orderedSteps[i].done){
      doneSteps.push(orderedSteps[i])
    }else{
      activeSteps.push(orderedSteps[i])
    }
  }

  return(
    <>
      <SmallTitle>Meal Output</SmallTitle>
      <Content>
        {/* <SmallTitle>{"<Timer Here>"}</SmallTitle> */}
        <MyList
          data={[...activeSteps,...doneSteps]}
          renderItem={({item})=><RecipeTaskItem step={item.step}  
            startTime={formatTime(item.startTime,time,period)} 
            endTime={formatTime(item.endTime,time,period)}
            done={item.done}
            setDone={setDone}/>
          }
          keyExtractor={(item)=>item.step.key}
        />
      </Content>
      <Footer>
        <Back onPress={back}>Back</Back>
      </Footer>
    </>
  )
}