import {useState} from "react"
import {StatusBar} from "react-native";
import styled, { ThemeProvider } from "styled-components/native";
import SafeAreaView, { SafeAreaProvider } from "react-native-safe-area-view";
import {theme} from "./src/Inf/themes";
import {v4 as uuid} from "uuid"
import Views from "./src/Enums/Views.enum";
import Channel from "./src/Enums/Channel.enum";
import HomeView from "./src/Views/Home.view";
import RecipeListView from "./src/Views/RecipeList.view";
import MealFormView from "./src/Views/MealForm.view";
import RecipeTaskView from "./src/Views/TaskList.view";
import MealOutputView from "./src/Views/MealOutput.view";


const SafeArea = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${StatusBar.currentHeight}px;
  background-color: ${(props) => props.theme.colors.ui.primary};
  align-items: stretch;
`;


const TemplateRecipes = [{
    title:"Cookies",
    key:uuid(),
    tasks:[
      {
        recipeTitle:"Cookies",
        key:uuid(),
        ordinalId:1,
        instructions:"1",
        channel:Channel.Prep,
        time:1,
      },{
        recipeTitle:"Cookies",
        key:uuid(),
        ordinalId:2,
        instructions:"2",
        channel:Channel.Prep,
        time:2,
      },{
        recipeTitle:"Cookies",
        key:uuid(),
        ordinalId:3,
        instructions:"3",
        channel:Channel.Prep,
        time:3,
      },{
        recipeTitle:"Cookies",
        key:uuid(),
        ordinalId:4,
        instructions:"4",
        channel:Channel.Prep,
        time:4,
      },{
        recipeTitle:"Cookies",
        key:uuid(),
        ordinalId:5,
        instructions:"5",
        channel:Channel.Prep,
        time:5,
      },{
        recipeTitle:"Cookies",
        key:uuid(),
        ordinalId:6,
        instructions:"6",
        channel:Channel.Prep,
        time:6,
      },{
        recipeTitle:"Cookies",
        key:uuid(),
        ordinalId:7,
        instructions:"7",
        channel:Channel.Prep,
        time:7,
      },{
        recipeTitle:"Cookies",
        key:uuid(),
        ordinalId:8,
        instructions:"8",
        channel:Channel.Prep,
        time:8,
      },{
        recipeTitle:"Cookies",
        key:uuid(),
        ordinalId:9,
        instructions:"9",
        channel:Channel.Prep,
        time:9,
      }
    ]
  },{
    title:"Brownies",
    key:uuid(),
    tasks:[
      {
        recipeTitle:"Brownies",
        key:uuid(),
        ordinalId:1,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:10,
      },{
        recipeTitle:"Brownies",
        key:uuid(),
        ordinalId:2,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:10,
      },{
        recipeTitle:"Brownies",
        key:uuid(),
        ordinalId:3,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:10,
      },{
        recipeTitle:"Brownies",
        key:uuid(),
        ordinalId:4,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:10,
      },{
        recipeTitle:"Brownies",
        key:uuid(),
        ordinalId:5,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:10,
      },
    ]
  },{
    title:"Cake",
    key:uuid(),
    tasks:[
      {
        recipeTitle:"Cake",
        key:uuid(),
        ordinalId:1,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:1,
      },      {
        recipeTitle:"Cake",
        key:uuid(),
        ordinalId:2,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:1,
      },      {
        recipeTitle:"Cake",
        key:uuid(),
        ordinalId:3,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:1,
      },      {
        recipeTitle:"Cake",
        key:uuid(),
        ordinalId:4,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:1,
      },      {
        recipeTitle:"Cake",
        key:uuid(),
        ordinalId:5,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:1,
      },      {
        recipeTitle:"Cake",
        key:uuid(),
        ordinalId:6,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:1,
      },      {
        recipeTitle:"Cake",
        key:uuid(),
        ordinalId:7,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:1,
      },      {
        recipeTitle:"Cake",
        key:uuid(),
        ordinalId:8,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:1,
      },      {
        recipeTitle:"Cake",
        key:uuid(),
        ordinalId:9,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:1,
      },      {
        recipeTitle:"Cake",
        key:uuid(),
        ordinalId:10,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:1,
      },      {
        recipeTitle:"Cake",
        key:uuid(),
        ordinalId:11,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:1,
      },      {
        recipeTitle:"Cake",
        key:uuid(),
        ordinalId:12,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:1,
      },      {
        recipeTitle:"Cake",
        key:uuid(),
        ordinalId:13,
        instructions:"placeholder",
        channel:Channel.Prep,
        time:1,
      }
    ]
  },{
    title:"Turkey Stock",
    key:uuid(),
    tasks:[
      {
        recipeTitle:"Turkey Stock",
        key:uuid(),
        ordinalId:1,
        instructions:"Preheat oven to 400 degrees F",
        channel:Channel.Oven,
        time:10, 
      },{
        recipeTitle:"Turkey Stock",
        key:uuid(),
        ordinalId:2,
        instructions: "Evenly Rub Turkey Pats with oil and sprinkle with salt and pepper.",
        channel:Channel.Prep,
        time:2,
      },{
        recipeTitle:"Turkey Stock",
        key:uuid(),
        ordinalId:3,
        instructions: "Roast turkey skin side down in large roasting pan",
        channel:Channel.Oven,
        time:45,
      },{
        recipeTitle:"Turkey Stock",
        key:uuid(),
        ordinalId:4,
        instructions:"Prepare and combine vegitables",
        channel:Channel.Prep,
        time:2,
      },{
        recipeTitle:"Turkey Stock",
        key:uuid(),
        ordinalId:5,
        instructions:"Remove Turkey from oven, reduce heat of oven to 350 degrees F, remove turkey from pan and mix vegitables with juices remaining in pan before reinserting turkey skin side up on vegitables.",
        channel:Channel.Oven,
        time:2,
      },{
        recipeTitle:"Turkey Stock",
        key:uuid(),
        ordinalId:6,
        instructions:"Place Turkey back in 350 deg F oven and continue to roast.",
        channel:Channel.Oven,
        time:35,
      }
    ]
  },{
    title: "Tacos",
    key:uuid(),
    tasks:[
      {
        key:uuid(),
        ordinalId:1,
        instructions:"brown the meat",
        channel:Channel.Prep,
        time:10,
      },{
        key:uuid(),
        ordinaId:2,
        instructions:"chop lettuce",
        channel:Channel.Prep,
        time:2,
      },{
        key:uuid(),
        ordinaId:3,
        instructions:"chop tomatos",
        channel:Channel.Prep,
        time:2,
      },{
        key:uuid(),
        ordinaId:4,
        instructions:"chop onion",
        channel:Channel.Prep,
        time:2,
      },{
        key:uuid(),
        ordinaId:5,
        instructions:"prepare shreded cheese",
        channel:Channel.Prep,
        time:2,
      },{
        key:uuid(),
        ordinaId:6,
        instructions:"warm tortillas/shells",
        channel:Channel.Prep,
        time:5,
      }
    ]
  }
]



export default function App() {
  let [Recipes,changeRecipes] = useState(TemplateRecipes)
  let [currentView,changeCurrentView] = useState(Views.Home)
  let [selectedRecipe,setSelectedRecipe] = useState(0)
  let [mealTime,setMealTime] = useState(5)
  let [mealPeriod, setMealPeriod] = useState(1)
  let [mealRecipes, setMealRecipes] = useState(Recipes)
  
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

  const submitMealForm=(MealTime,MealPeriod,MealRecipes)=>{
    changeCurrentView(Views.MealOutput);
    setMealTime(MealTime)
    setMealPeriod(MealPeriod)
    setMealRecipes(MealRecipes)

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
        back={toHome}
        recipes={Recipes}
        submitMealForm={submitMealForm}/>
      break;
    case Views.RecipeTasks:
      view = <RecipeTaskView 
        back={toRecipes}
        recipe={Recipes[selectedRecipe]}
        addTask={addTask}/>
      break;
    case Views.MealOutput:
      view = <MealOutputView
        back={toMealForm}
        time={mealTime}
        period={mealPeriod}
        recipes={mealRecipes}/>
      break;
    default:
      view = <HomeView 
        toRecipes={toRecipes}
        toMeals={toMealForm}/>
      break;
  }
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <SafeArea>
          {view}
        </SafeArea>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
