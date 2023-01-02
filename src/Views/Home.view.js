import Views from "../Enums/Views.enum";
import { Title, Links, Link } from "../Com/StyleComps";

export default function ({ toRecipes, toMeals }) {
  return (
    <>
      <Title>Meal Timer</Title>
      <Links>
        <Link onPress={toRecipes}>Recipes</Link>
        <Link onPress={toMeals}>Meals</Link>
      </Links>
    </>
  );
}
