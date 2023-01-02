import {useState} from 'react'
import {Alert} from "react-native"
import {SmallTitle,Content,List,
  ListItem,Footer,Back,NewItemButton,
  Popup,CenterPopup,PopupView,PopupHeader,
  PopupTitle,ClosePopup,TextEntry,SmallButton} from "../Com/StyleComps"

const titleFormat = (str)=>{
  let out = ""
  for (let word of str.split(" ")){
    out += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() + " ";
  }
  return out.trim()
}

export default function({back,recipes=[],addRecipe,goToRecipe}){
  let [showNewRecipePopup,setShowNewRecipePopup] = useState(false)
  let [newRecipeTitle,onChangeNewRecipeTitle] = useState("")
  const popupButtonHandler=(e)=>{
    if(newRecipeTitle){
      addRecipe(titleFormat(newRecipeTitle));
      onChangeNewRecipeTitle("");
      goToRecipe(recipes.length);
    }
    setShowNewRecipePopup(false);
  }
  return(
    <>
      <SmallTitle>Recipe List</SmallTitle>
      <Content>
        <List
          data={recipes}
          renderItem={({item,index})=>{
            return <ListItem onPress={()=>goToRecipe(index)}>{item.title}: {item.tasks?item.tasks.length:0}</ListItem>
          }}
          keyExtractor={(element)=>{return element.key}}/>
      </Content>
      <Footer>
        <Back onPress={back}>Back</Back>
        <NewItemButton onPress={()=>setShowNewRecipePopup(!showNewRecipePopup)}>Add Recipe</NewItemButton>
      </Footer>
      <Popup
        animationType="slide"
        transparent = {true}
        visible={showNewRecipePopup}
        onRequestClose={()=>{
          Alert.alert("New Recipe has been closed.");
          setShowNewRecipePopup(false)
      }}>
        <CenterPopup>
          <PopupView>
            <PopupTitle>New Recipe</PopupTitle>
            <TextEntry 
              onChangeText={onChangeNewRecipeTitle} 
              value={newRecipeTitle} 
              placeholder="Recipe Title"
              onSubmitEditing={popupButtonHandler}/>
            <SmallButton onPress={popupButtonHandler}>Add</SmallButton>
            <ClosePopup onPress={()=>setShowNewRecipePopup(false)}>X</ClosePopup>
          </PopupView>
        </CenterPopup>
      </Popup>
    </>
  )
}