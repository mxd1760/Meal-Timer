import {React} from "react"
import { MyCaption,RTIView,RTIView2, ListItemView,RTIButton, RTIHeader, RTIImpact} from "./StyleComps"

export default function RecipeTaskItem({step,startTime,endTime}){
  return(
    <ListItemView>
      <RTIView>
        <RTIHeader>{step.recipeTitle}{"->"}Step: {step.ordinalId}</RTIHeader>
        <MyCaption>{"\t"} - {step.instructions}</MyCaption>
      </RTIView>
      <RTIView2>
        <RTIView2>
          <RTIImpact> Start:{startTime}</RTIImpact>
          <RTIImpact> End:{endTime}</RTIImpact>
        </RTIView2>
        <RTIButton> Done </RTIButton>
      </RTIView2>
    </ListItemView>
  )
}