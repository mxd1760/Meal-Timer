import {Title,Link} from "../Com/StyleComps"


export default function({back}){
  return(
    <>
      <Title>Meal Output</Title>
      <Link onPress={back}>Back</Link>
    </>
  )
}