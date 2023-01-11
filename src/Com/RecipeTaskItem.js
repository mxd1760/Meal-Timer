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

export default function RecipeTaskItem({ step, startTime, endTime }) {
  return (
    <ListItemView>
      <RTIView>
        <RTIHeader>
          {step.recipeTitle}
          {"->"}Step: {step.ordinalId}
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
        <RTIButton> Done </RTIButton>
      </RTIView2>
    </ListItemView>
  );
}
