export default class Views {
  static Home = new Views("home")
  static Recipes = new Views("recipes")
  static RecipeTasks = new Views("tasks")
  static MealForm = new Views("meal form")
  static MealOutput = new Views("meal output")
  static QuickNewRecipe = new Views("quick new recipe")


  constructor(name){
    this.name=name;
  }

  equals(obj){
    if(!obj instanceof Views){return false;}
    if(obj.name!=this.name){return false;}
    return true;
  }
  
}