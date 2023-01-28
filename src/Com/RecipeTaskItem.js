import { React } from "react";
import {
  MyCaption,
  RTIView,
  RTIView2,
  ListItemView,
  RTIButton,
  RTIHeader,
  RTITimeStamp,
} from "./StyleComps";

export default function RecipeTaskItem({ step, startTime, endTime,done,setDone }) {
  const doneButtonHandler = (e)=>{
    setDone(step)
  }
  return (
    <ListItemView done={done}>
      <RTIView>
        <RTIHeader>
          {step.recipeTitle}
          {" -> "}Step:{step.ordinalId}
        </RTIHeader>
        <MyCaption>
          {"\t"} - {step.instructions}
        </MyCaption>
      </RTIView>
      <RTIView2>
        <RTIView2>
          <RTITimeStamp> Start: {startTime}</RTITimeStamp>
          <RTITimeStamp> End: {endTime}</RTITimeStamp>
        </RTIView2>
        <RTIButton onPress={doneButtonHandler}> Done </RTIButton>
      </RTIView2>
    </ListItemView>
  );
}
