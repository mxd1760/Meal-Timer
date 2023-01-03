import {useState} from "react"
import {StatusBar} from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import {theme} from "./src/Inf/themes";
import {v4 as uuid} from "uuid"
import Views from "./src/Enums/Views.enum";
import Channel from "./src/Enums/Channel.enum";
import HomeView from "./src/Views/Home.view";
import RecipeListView from "./src/Views/RecipeList.view";
import MealFormView from "./src/Views/MealForm.view";
import RecipeTaskView from "./src/Views/TaskList.view";
import MealOutputView from "./src/Views/MealOutput.view";




const SafeArea = styled.SafeAreaView`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
  margin-bottom: ${StatusBar.currentHeight}px;
  background-color: ${(props) => props.theme.colors.ui.primary};
  align-items: stretch;
`;

const TemplateRecipes = [{
    title:"Cookies",
    key:uuid(),
    tasks:[
      {
        key:uuid(),
        ordinalId:1,
        instructions:"1",
        channel:Channel.Default,
        time:100,
      },{
        key:uuid(),
        ordinalId:2,
        instructions:"2",
        channel:Channel.Default,
        time:200,
      },{
        key:uuid(),
        ordinalId:3,
        instructions:"3",
        channel:Channel.Default,
        time:300,
      },{
        key:uuid(),
        ordinalId:4,
        instructions:"4",
        channel:Channel.Default,
        time:400,
      },{
        key:uuid(),
        ordinalId:5,
        instructions:"5",
        channel:Channel.Default,
        time:500,
      },{
        key:uuid(),
        ordinalId:6,
        instructions:"6",
        channel:Channel.Default,
        time:600,
      },{
        key:uuid(),
        ordinalId:7,
        instructions:"7",
        channel:Channel.Default,
        time:700,
      },{
        key:uuid(),
        ordinalId:8,
        instructions:"8",
        channel:Channel.Default,
        time:800,
      },{
        key:uuid(),
        ordinalId:9,
        instructions:"9",
        channel:Channel.Default,
        time:900,
      }
    ]
  },{
    title:"Brownies",
    key:uuid(),
    tasks:[
      {
        key:uuid(),
        ordinalId:1,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      },      {
        key:uuid(),
        ordinalId:2,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      },      {
        key:uuid(),
        ordinalId:3,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      },      {
        key:uuid(),
        ordinalId:4,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      },      {
        key:uuid(),
        ordinalId:5,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      },
    ]
  },{
    title:"Cake",
    key:uuid(),
    tasks:[
      {
        key:uuid(),
        ordinalId:1,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      },      {
        key:uuid(),
        ordinalId:2,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      },      {
        key:uuid(),
        ordinalId:3,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      },      {
        key:uuid(),
        ordinalId:4,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      },      {
        key:uuid(),
        ordinalId:5,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      },      {
        key:uuid(),
        ordinalId:6,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      },      {
        key:uuid(),
        ordinalId:7,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      },      {
        key:uuid(),
        ordinalId:8,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      },      {
        key:uuid(),
        ordinalId:9,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      },      {
        key:uuid(),
        ordinalId:10,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      },      {
        key:uuid(),
        ordinalId:11,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      },      {
        key:uuid(),
        ordinalId:12,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      },      {
        key:uuid(),
        ordinalId:13,
        instructions:"placeholder",
        channel:Channel.Default,
        time:100,
      }
    ]
  },{
    title:"Turkey Stock",
    key:uuid(),
    tasks:[
      {
        key:uuid(),
        ordinalId:1,
        instructions:"Preheat oven to 400 degrees F",
        channel:Channel.Oven,
        time:10, 
      },{
        key:uuid(),
        ordinalId:2,
        instructions: "Evenly Rub Turkey Pats with oil and sprinkle with salt and pepper.",
        channel:Channel.Default,
        time:2,
      },{
        key:uuid(),
        ordinalId:3,
        instructions: "Roast turkey skin side down in large roasting pan",
        channel:Channel.Oven,
        time:45,
      },{
        key:uuid(),
        ordinalId:4,
        instructions:"Prepare and combine vegitables",
        channel:Channel.Default,
        time:2,
      },{
        key:uuid(),
        ordinalId:5,
        instructions:"Remove Turkey from oven, reduce heat of oven to 350 degrees F, remove turkey from pan and mix vegitables with juices remaining in pan before reinserting turkey skin side up on vegitables.",
        channel:Channel.Oven,
        time:2,
      },{
        key:uuid(),
        ordinalId:6,
        instructions:"Place Turkey back in 350 deg F oven and continue to roast.",
        channel:Channel.Oven,
        time:35,
      }
    ]
  }
]



export default function App() {
  let [Recipes,changeRecipes] = useState(TemplateRecipes)
  let [currentView,changeCurrentView] = useState(Views.Home)
  let [selectedRecipe,setSelectedRecipe] = useState(0)
  
  const addRecipe = (newRecipeTitle)=>{
    const newRecipe = {
      title:newRecipeTitle,
      key:uuid(),
      tasks:[]
    }
    changeRecipes([...Recipes,newRecipe])
  }
  const addTask = (newTask)=>{
    changeRecipes(Recipes.map((recipe,n)=>{
      if(n==selectedRecipe){
        recipe.tasks = [...recipe.tasks,newTask];
      }
      return recipe
    }))
  }

  const toHome = (e)=>{
    changeCurrentView(Views.Home)
  }
  const toRecipes = (e)=>{
    changeCurrentView(Views.Recipes)
  }
  const toMealForm=(e)=>{
    changeCurrentView(Views.MealForm)
  }

  const goToRecipe=(recipeIndex)=>{
    setSelectedRecipe(recipeIndex);
    changeCurrentView(Views.RecipeTasks);
  }

  let view = null
  switch(currentView){
    case Views.Recipes:
      view = <RecipeListView 
        back={toHome}
        recipes={Recipes}
        addRecipe={addRecipe}
        goToRecipe={goToRecipe}/>
      break;
    case Views.MealForm:
      view = <MealFormView
        back={toHome}/>
      break;
    case Views.RecipeTasks:
      view = <RecipeTaskView 
        back={toRecipes}
        recipe={Recipes[selectedRecipe]}
        addTask={addTask}/>
      break;
    case Views.MealOutput:
      view = <MealOutputView
        back={toMealForm}/>
      break;
    default:
      view = <HomeView 
        toRecipes={toRecipes}
        toMeals={toMealForm}/>
      break;
  }
  return (
    <ThemeProvider theme={theme}>
      <SafeArea>
        {view}
      </SafeArea>
    </ThemeProvider>
  );
}
