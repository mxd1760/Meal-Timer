import {useState} from "react"
import { Alert } from "react-native";
import {v4 as uuid} from "uuid"
import {SmallTitle,List,ListItem,Footer,Back,
  Popup,CenterPopup,PopupView,ClosePopup, 
  NewItemButton,Caption, PopupTitle, PopupText,
  InfoView,PopupSpan,NumberEntry,TextEntry,SmallButton} from "../Com/StyleComps"
import Channel from "../Enums/Channel.enum"
import {formatTime,formatTitle} from "../Util/HelperFunctions"


export default function({back,recipe={},addTask=()=>{}}){
  let [selectedTask,setSelectedTask] = useState(0)
  let [showTaskInfoPopup,setShowTaskInfoPopup] = useState(false)
  let [showNewTaskPopup,setShowNewTaskPopup] = useState(false)

  let [newTaskChannel,changeChannel] = useState(Channel.Default)
  let [newTaskTime,changeNewTaskTime] = useState(0)
  let [newTaskInstructions,changeInstructions] = useState("")

  const newTaskButtonHandler = (e)=>{
    if(newTaskTime&&newTaskInstructions){
      addTask({
        key:uuid(),
        ordinalId:recipe.tasks.length+1,
        channel:newTaskChannel,
        instructions:newTaskInstructions,
        time:newTaskTime,
      })
      changeChannel(Channel.Default);
      changeNewTaskTime(0);
      changeInstructions("");
    }else{
      Alert.alert("Empty task is invalid please provide values")
    }
    setShowNewTaskPopup(false)
  }
  const softSubmit=(e)=>{
    if(newTaskTime&&newTaskInstructions){
      newTaskButtonHandler(e)
    }
  }

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
            <PopupTitle>Step: {recipe.tasks.length+1}</PopupTitle>
            <InfoView>
              <PopupText>Channel: </PopupText>
              <PopupSpan>
                <PopupText>Time:</PopupText>
                <NumberEntry 
                  onChangeText={changeNewTaskTime} 
                  value={newTaskTime}
                  keyboardType="numeric"
                  onSubmitEditing={softSubmit}/> 
                <PopupText>minutes</PopupText>
              </PopupSpan>
              <PopupText>Instructions:</PopupText>
              <TextEntry
                onChangeText={changeInstructions}
                value={newTaskInstructions}
                onSubmitEditing={softSubmit}/>
            </InfoView>
            <SmallButton onPress={newTaskButtonHandler}>Add</SmallButton>
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
        {recipe.tasks.length?
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
        :null}
      </Popup>
    </>
  )
}