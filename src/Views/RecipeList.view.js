import { useState } from "react";
import { Alert } from "react-native";
import {
  SmallTitle,
  Content,
  MyList,
  ListItem,
  Footer,
  Back,
  NewItemButton,
  Popup,
  CenterPopup,
  PopupView,
  PopupHeader,
  PopupTitle,
  ClosePopup,
  TextEntry,
  SmallButton,
  RLText,
  RLText2,
  ListItemView,
  RLWrapper,
  RLPressable,
} from "../Com/StyleComps";
import { formatTitle } from "../Util/HelperFunctions";
import { formatDelay } from "../Util/RecipeCalcFunctions";

export default function ({ back, recipes = [], addRecipe, goToRecipe }) {
  let [showNewRecipePopup, setShowNewRecipePopup] = useState(false);
  let [newRecipeTitle, onChangeNewRecipeTitle] = useState("");
  const popupButtonHandler = (e) => {
    if (newRecipeTitle) {
      addRecipe(formatTitle(newRecipeTitle));
      onChangeNewRecipeTitle("");
      goToRecipe(recipes.length);
    }
    setShowNewRecipePopup(false);
  };
  return (
    <>
      <SmallTitle>Recipe List</SmallTitle>
      <Content>
        <MyList
          data={recipes}
          renderItem={({ item, index }) => {
            let totalTime = 0;
            if(item.tasks){
              item.tasks.forEach(element => {
                totalTime+=element.time;
              });
            }
            return (
              <RLPressable onPress={() => goToRecipe(index)}>
                <ListItemView>
                  <RLText>{item.title}:</RLText>
                  <RLText2>{formatDelay(totalTime)}</RLText2>
                </ListItemView>
              </RLPressable>
            );
          }}
          keyExtractor={(element) => {
            return element.key;
          }}
        />
      </Content>
      <Footer>
        <Back onPress={back}>Back</Back>
        <NewItemButton
          onPress={() => setShowNewRecipePopup(!showNewRecipePopup)}
        >
          Add Recipe
        </NewItemButton>
      </Footer>
      <Popup
        animationType="slide"
        transparent={true}
        visible={showNewRecipePopup}
        onRequestClose={() => {
          Alert.alert("New Recipe has been closed.");
          setShowNewRecipePopup(false);
        }}
      >
        <CenterPopup>
          <PopupView>
            <RLWrapper>
              <PopupTitle>New Recipe</PopupTitle>
              <TextEntry
                onChangeText={onChangeNewRecipeTitle}
                value={newRecipeTitle}
                placeholder="Recipe Title"
                onSubmitEditing={popupButtonHandler}
              />
            </RLWrapper>
            <SmallButton onPress={popupButtonHandler}>Add</SmallButton>
            <ClosePopup onPress={() => setShowNewRecipePopup(false)}>
              X
            </ClosePopup>
          </PopupView>
        </CenterPopup>
      </Popup>
    </>
  );
}
