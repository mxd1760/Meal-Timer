import {useEffect, useState} from "react"
import RecipeTaskItem from "../Com/RecipeTaskItem"
import {Content, Back, SmallTitle, MyList,Footer} from "../Com/StyleComps"
import {calculateRecipeStepOrder} from "../Util/RecipeCalcFunctions"
import { defaultChannelSettings } from "../Enums/Channel.enum"


export default function({back,time,period,recipes,channelSettings=defaultChannelSettings}){
  let [orderedSteps,setOrderedSteps] = useState([])
  useEffect(()=>{
    // let mealTimeTarget = period == 0?time+1:time+13;
    // if (time==11){
    //   mealTimeTarget = period==0?0:12;
    // }
    setOrderedSteps(calculateRecipeStepOrder(recipes,channelSettings))
  },[]);

  return(
    <>
      <SmallTitle>Meal Output</SmallTitle>
      <Content>
        <SmallTitle>{"<Timer Here>"}</SmallTitle>
        <MyList
          data={orderedSteps}
          renderItem={({item})=><RecipeTaskItem step={item.step}  startTime={item.startTime} endTime={item.endTime}/>}
          keyExtractor={(item)=>item.step.key}
        />
      </Content>
      <Footer>
        <Back onPress={back}>Back</Back>
      </Footer>
    </>
  )
}