import {useState} from "react"
import {SmallTitle,CollapsedList,Back,
  CollapsedListItem,ClosePopup,NewItemButton,
  Content,Footer,Selector,Group,SimpleText, Popup, 
  CenterPopup,PopupView, MyList,ListItem} from "../Com/StyleComps"
import { theme } from "../Inf/themes"

const times = ["1","2","3","4","5","6",
"7","8","9","10","11","12"]
const period = ["am","pm"]

export default function({back,recipes}){
  const [showSelectRecipePopup,setShowSelectRecipePopup] = useState(false)
  const [selectedRecipes,setSelectedRecipes] = useState([])
  const [selectedTimePeriod,setSelectedTimePeriod] = useState(0)
  const [selectedTime,setSelectedTime] = useState(0)

  const addSelectedRecipe = (idx)=>{
    if(selectedRecipes.indexOf(idx)==-1){
      setSelectedRecipes([...selectedRecipes,idx])
    }
  }

  const selectedRecipeComponents = selectedRecipes.map(
    (recipeIndex)=><CollapsedListItem title={recipes[recipeIndex].title}/>
  )
  const handleNewRecipe = (e)=>{
    setShowSelectRecipePopup(true);
  }
  return(
    <>
      <SmallTitle>Plan Your Meal</SmallTitle>
      <Content>
        <CollapsedList
          title="Recipes for this meal"
          left={props=><ClosePopup/>}>
            {selectedRecipeComponents}
            <CollapsedListItem style={{backgroundColor:theme.colors.ui.tertiary,borderRadius:16}} title="+ Add Recipe" onPress={handleNewRecipe}/>
        </CollapsedList>
        <Group>
        <Group>
          <SimpleText>Meal Time: </SimpleText>
          <Selector
            data={times}
            defaultButtonText="time"
            buttonStyle={{width:160}}
            onSelect={(item,i)=>{
              setSelectedTime(i)
            }}
            buttonTextAfterSelection={(item)=>{
              return item;
            }}
            rowTextForSelection={(item)=>{
              return item
            }}
          />
        </Group>
        <Selector
            data={period}
            buttonStyle={{width:80}}
            defaultButtonText={period[selectedTimePeriod]}
            onSelect={(item,i)=>{
              setSelectedTimePeriod(i)
            }}
            buttonTextAfterSelection={(item)=>{
              return item;
            }}
            rowTextForSelection={(item)=>{
              return item
            }}
          />
        </Group>
      </Content>
      <Footer>
        <Back onPress={back}>Back</Back>
        <NewItemButton
          
        >
          Go
        </NewItemButton>
      </Footer>
      <Popup
        animationType="slide"
        transparent={true}
        visible={showSelectRecipePopup}
        onRequestClose={() => {
          Alert.alert("Select Popup has been closed.");
          setShowSelectRecipePopup(false);
        }}>
        <CenterPopup>
          <PopupView>
            <MyList
              data={recipes}
              renderItem={({ item, index }) => (
                <ListItem
                  onPress={() => {
                    addSelectedRecipe(index)
                    setShowSelectRecipePopup(false)
                  }}
                  style={{backgroundColor:(selectedRecipes.indexOf(index)==-1)?theme.colors.brand.secondary:theme.colors.ui.secondary}}
                >
                  {item.title}
                </ListItem>
              )}
              keyExtractor={(item) => item.key}
            />
            <ClosePopup>X</ClosePopup>
          </PopupView>
        </CenterPopup>
      </Popup>
    </>
  )
}