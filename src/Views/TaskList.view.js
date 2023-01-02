import {useState} from "react"
import {SmallTitle,List,ListItem,Footer,Back,
  Popup,CenterPopup,PopupView,ClosePopup, 
  NewItemButton,Caption, PopupTitle, PopupText,InfoView} from "../Com/StyleComps"

const formatTime = (time)=>{
  return `${time} seconds`;
}

export default function({back,recipe={}}){
  let [selectedTask,setSelectedTask] = useState(0)
  let [showTaskInfoPopup,setShowTaskInfoPopup] = useState(false)
  let [showNewTaskPopup,setShowNewTaskPopup] = useState(false)
  return(
    <>
      <SmallTitle>{recipe.title}</SmallTitle>
      <List
        data={recipe.tasks}
        renderItem={({item,index})=>
          <ListItem onPress={()=>{
            if(!showNewTaskPopup){
              setSelectedTask(index)
              setShowTaskInfoPopup(true)
            }
          }}>Step {item.ordinalId}: {formatTime(item.time)}</ListItem>
        }
        keyExtractor={(item)=>item.key}
        />
      <Footer>
        <Back onPress={back}>Back</Back>
        <NewItemButton onPress={()=>showTaskInfoPopup||setShowNewTaskPopup(true)}>Add Step</NewItemButton>
      </Footer>
      <Popup        
        animationType="slide"
        transparent = {true}
        visible={showNewTaskPopup}
        onRequestClose={()=>{
          Alert.alert("New Task has been closed.");
          setShowNewTaskPopup(false)
      }}>
        <CenterPopup>
          <PopupView>
            <ClosePopup onPress={()=>setShowNewTaskPopup(false)}>X</ClosePopup>
          </PopupView>
        </CenterPopup>
      </Popup>
      <Popup
        animationType="slide"
        transparent = {true}
        visible={showTaskInfoPopup}
        onRequestClose={()=>{
          Alert.alert("Task Info has been closed.");
          setShowTaskInfoPopup(false)
      }}>
        <CenterPopup>
          <PopupView>
            <PopupTitle>Step: {recipe.tasks[selectedTask].ordinalId}</PopupTitle>
            <InfoView>
              <PopupText>Channel: {recipe.tasks[selectedTask].channel.name}</PopupText>
              <PopupText>Time: {formatTime(recipe.tasks[selectedTask].time)}</PopupText>
              <PopupText>Instructions:</PopupText>
              <Caption>
                 -- {recipe.tasks[selectedTask].instructions}
              </Caption>
            </InfoView>
            <ClosePopup onPress={()=>setShowTaskInfoPopup(false)}>X</ClosePopup>
          </PopupView>
        </CenterPopup>
      </Popup>
    </>
  )
}