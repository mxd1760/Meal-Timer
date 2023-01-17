import { useState } from "react";
import { Alert } from "react-native";
import {
  SmallTitle,
  CollapsedList,
  Back,
  CollapsedListItem,
  ClosePopup,
  NewItemButton,
  Content,
  Footer,
  Selector,
  Group,
  SimpleText,
  Popup,
  CenterPopup,
  PopupView,
  MyList,
  ListItem,
  SmallButton,
} from "../Com/StyleComps";
import { theme } from "../Inf/themes";
import { times, periods } from "../Util/Times";

export default function ({ back, recipes, submitMealForm,divertToNewRecipe }) {
  const [showSelectRecipePopup, setShowSelectRecipePopup] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState(1);
  const [selectedTime, setSelectedTime] = useState(null);

  const [recipeListIsValid,setRecipeListIsValid] = useState(true)
  const [timeIsValid,setTimeIsValid] = useState(true)

  const addSelectedRecipe = (idx) => {
    if (selectedRecipes.indexOf(idx) == -1) {
      setSelectedRecipes([...selectedRecipes, idx]);
    }
  };

  const submit = (e) => {
    let exitEarly = false;
    if(selectedTime==null){
      setTimeIsValid(false)
      exitEarly=true;
    }
    if(selectedRecipes.length<1){
      setRecipeListIsValid(false)
      exitEarly=true
    }
    if(exitEarly){
      return;
    }
    submitMealForm(selectedTime, selectedTimePeriod, selectedRecipes.map((idx)=>recipes[idx]));
  };

  const selectedRecipeComponents = selectedRecipes.map((recipeIndex) => (
    <CollapsedListItem title={recipes[recipeIndex].title} />
  ));
  const handleNewRecipe = (e) => {
    setShowSelectRecipePopup(true);
    setRecipeListIsValid(true)
  };
  return (
    <>
      <SmallTitle>Prepare Meal</SmallTitle>
      <Content>
      <Group>
          <Group>
            <SimpleText>Meal Time: </SimpleText>
            <Selector
              data={times}
              defaultButtonText="time"
              buttonStyle={{ width: 160,backgroundColor:timeIsValid?
                theme.colors.ui.tertiary:
                theme.colors.ui.error}}
              onSelect={(item, i) => {
                setSelectedTime(i);
                setTimeIsValid(true);
              }}
              buttonTextAfterSelection={(item) => {
                return item;
              }}
              rowTextForSelection={(item) => {
                return item;
              }}
            />
          </Group>
          <Selector
            data={periods}
            buttonStyle={{ width: 80,backgroundColor:timeIsValid?
              theme.colors.ui.tertiary:
              theme.colors.ui.error}}
            defaultButtonText={periods[selectedTimePeriod]}
            onSelect={(item, i) => {
              setSelectedTimePeriod(i);
              setTimeIsValid(true)
            }}
            buttonTextAfterSelection={(item) => {
              return item;
            }}
            rowTextForSelection={(item) => {
              return item;
            }}
          />
        </Group>
        <CollapsedList
          style={recipeListIsValid||{backgroundColor:theme.colors.ui.error}}
          title="Recipes for this meal"
          left={(props) => <ClosePopup />}
        >
          {selectedRecipeComponents}
          <CollapsedListItem
            style={{
              backgroundColor: theme.colors.ui.tertiary,
              borderRadius: 16,
            }}
            title="+ Add Recipe"
            onPress={handleNewRecipe}
          />
        </CollapsedList>
      </Content>
      <Footer>
        <Back onPress={back}>Back</Back>
        <NewItemButton onPress={submit}>Go</NewItemButton>
      </Footer>
      <Popup
        animationType="slide"
        transparent={true}
        visible={showSelectRecipePopup}
        onRequestClose={() => {
          Alert.alert("Select Popup has been closed.");
          setShowSelectRecipePopup(false);
        }}
      >
        <CenterPopup>
          <PopupView style={{height:50}}>
            <MyList
              data={recipes}
              renderItem={({ item, index }) => (
                <ListItem
                  onPress={() => {
                    addSelectedRecipe(index);
                    setShowSelectRecipePopup(false);
                  }}
                  style={{
                    backgroundColor:
                      selectedRecipes.indexOf(index) == -1
                        ? theme.colors.brand.secondary
                        : theme.colors.ui.secondary,
                  }}
                >
                  {item.title}
                </ListItem>
              )}
              keyExtractor={(item) => item.key}
            />
            <SmallButton onPress={divertToNewRecipe}>New Recipe</SmallButton>
            <ClosePopup onPress={()=>setShowSelectRecipePopup(false)}>X</ClosePopup>
          </PopupView>
        </CenterPopup>
      </Popup>
    </>
  );
}
