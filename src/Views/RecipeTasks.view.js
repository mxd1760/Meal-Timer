import { useState } from "react";
import { Alert } from "react-native";
import { v4 as uuid } from "uuid";
import {
  SmallTitle,
  MyList,
  ListItemView,
  Footer,
  Back,
  Popup,
  CenterPopup,
  PopupView,
  ClosePopup,
  NewItemButton,
  MyCaption,
  PopupTitle,
  PopupText,
  InfoView,
  PopupSpan,
  NumberEntry,
  TextAreaEntry,
  SmallButton,
  Selector,
  MiniPopupView,
  SmallPopupTitle,
  MoveBubble,
  RLPressable,
  RLText,
  Space,
  HeaderIconButton,
  StepInfoActionsSpan,
  CenterDarkenPopup
} from "../Com/StyleComps";
import Channel  from "../Enums/Channel.enum";
import { formatTime } from "../Util/HelperFunctions";
import { theme } from "../Inf/themes";
import { IconButton } from "react-native-paper";


export default function ({ back, 
    recipe = {}, 
    addTask = () => {console.error("provide an addTask function to recipeTasks")} , 
    replaceTask = () => {console.error("provide a replaceTask function to recipeTasks")}, 
    removeStep = ()=>{console.error("provide a removeStep function to recipeTasks")},
    removeRecipe = ()=>{console.error("provide a removeRecipe function to recipeTasks")}}) {
  let [selectedTask, setSelectedTask] = useState(0);
  let [showTaskInfoPopup, setShowTaskInfoPopup] = useState(false);
  let [showNewTaskPopup, setShowNewTaskPopup] = useState(false);
  let [newTaskChannel, changeChannel] = useState(Channel.Prep);
  let [newTaskTime, changeNewTaskTime] = useState(null);
  let [newTaskInstructions, changeInstructions] = useState("");
  let [showAddAnotherTaskPopup,setShowAddAnotherTaskPopup] = useState(false)
  let [instructionsAreValid,setInstructionsAreValid] = useState(true)
  let [timeIsValid,setTimeIsValid] = useState(true)
  let [editing,setEditing] = useState(false)
  let [draggingIndex,setDraggingIndex] = useState(-1)
  let [removingRecipe,setRemovingRecipe] = useState(false)
  let [showConfirmDeletePopup,setShowConfirmDeletePopup] = useState(false)

  // console.log(replaceTask)
  // console.log(addTask)

  const resetForm = ()=>{
    changeChannel(Channel.Prep);
    changeNewTaskTime(0);
    changeInstructions("");
    setShowNewTaskPopup(false);
  }
  const validateForm= ()=>{
    let valid = true;
    if (!newTaskTime||!Number.isInteger(newTaskTime)) {
      setTimeIsValid(false)
      valid=false
    }
    if(!newTaskInstructions){
      setInstructionsAreValid(false)
      valid=false;
    }
    return valid
  }
  const newTaskButtonHandler = (e) => {
    if(!validateForm()) return;
    addTask({
      recipeTitle: recipe.title,
      key: uuid(),
      ordinalId: recipe.tasks.length + 1,
      channel: newTaskChannel,
      instructions: newTaskInstructions,
      time: newTaskTime,
    });
    resetForm()
    setShowAddAnotherTaskPopup(true);
  };
  const softSubmit = (e) => {
    if (newTaskTime && newTaskInstructions) {
      editing?saveChanges(e):newTaskButtonHandler(e);
    }
  };
  const timeInputHandler = (newTime)=>{
    setTimeIsValid(true)
    changeNewTaskTime(parseInt(newTime))
  }
  const instructionsInputHandler = (newInstructions)=>{
    setInstructionsAreValid(true)
    changeInstructions(newInstructions)
  }
  const SAATP_no = (e)=>{
    setShowAddAnotherTaskPopup(false)
  }
  const SAATP_yes = (e)=>{
    setShowAddAnotherTaskPopup(false)
    setShowNewTaskPopup(true)
  }
  const changeInfoToEdit = (e)=>{
    setEditing(true)
    let editTask = recipe.tasks[selectedTask]
    changeChannel(editTask.channel)
    changeInstructions(editTask.instructions)
    changeNewTaskTime(editTask.time)
    setShowTaskInfoPopup(false)
    setShowNewTaskPopup(true)
  }
  const saveChanges = (e)=>{
    if(!validateForm()) return;
    replaceTask({
      recipeTitle: recipe.title,
      key: recipe.tasks[selectedTask].key,
      ordinalId: recipe.tasks[selectedTask].ordinalId,
      channel: newTaskChannel,
      instructions: newTaskInstructions,
      time: newTaskTime,
    },selectedTask)
    resetForm()
    setEditing(false)
  }
  const moveUp = (e)=>{
    let swapper = {...recipe.tasks[draggingIndex]}
    let swappee = {...recipe.tasks[draggingIndex-1]}
    swapper.ordinalId=draggingIndex-1+1
    swappee.ordinalId=draggingIndex+1
    replaceTask(swapper,draggingIndex-1)
    replaceTask(swappee,draggingIndex)
    setDraggingIndex((id)=>id-1)
  }
  const moveDown = (e)=>{
    let swapper = {...recipe.tasks[draggingIndex]}
    let swappee = {...recipe.tasks[draggingIndex+1]}
    swapper.ordinalId=draggingIndex+1+1
    swappee.ordinalId=draggingIndex+1
    replaceTask(swapper,draggingIndex+1)
    replaceTask(swappee,draggingIndex)
    setDraggingIndex((id)=>id+1)
  }

  const handleRemoveCancel=(e)=>{
    setShowConfirmDeletePopup(false)
  }
  const handleRemoveConfirm = (e)=>{
    setShowConfirmDeletePopup(false)
    if(removingRecipe){
      back()
      removeRecipe()
    }else{
      setShowTaskInfoPopup(false)
      removeStep(selectedTask)
      setSelectedTask(0)
    }
  }

  const handleRemoveRecipe = (e)=>{
    setRemovingRecipe(true)
    setShowConfirmDeletePopup(true)
  }
  const handleRemoveStep = (e)=>{
    setRemovingRecipe(false)
    setShowConfirmDeletePopup(true)
  }

  return (
    <>
      <Footer>
        <SmallTitle>{recipe.title}</SmallTitle>
        <HeaderIconButton
          icon="delete"
          size={50}
          iconColor={theme.colors.brand.primary}
          onPress={handleRemoveRecipe}/>
      </Footer>
      <MyList
        data={recipe.tasks}
        renderItem={({ item, index }) => (
          <RLPressable onPress={
            () => {
              if (!showNewTaskPopup&&draggingIndex==-1) {
                setSelectedTask(index);
                setShowTaskInfoPopup(true);
              }else{
                setDraggingIndex(-1)
              }}
          }>
          <ListItemView style={index==draggingIndex&&{backgroundColor:theme.colors.brand.primary}}>
            <RLText>Step {item.ordinalId}: {formatTime(item.time)}</RLText>
            <IconButton
              icon="arrow-up-down"
              disabled={draggingIndex!=-1}
              onPress={(e)=>{
                e.stopPropagation()
                setDraggingIndex(index)
              }}
            />
            {index==draggingIndex&&
            <MoveBubble>
              <RLPressable onPress={e=>{
                e.stopPropagation()
                console.log("stop??")}}>
                <Space>
                  <IconButton
                    icon="arrow-up"
                    disabled={draggingIndex==0}
                    onPress={moveUp}/>
                  <IconButton
                    icon="arrow-down"
                    disabled={draggingIndex==recipe.tasks.length-1}
                    onPress={moveDown}/>
                </Space>
              </RLPressable>
            </MoveBubble>}
          </ListItemView>
          </RLPressable>
        )}
        keyExtractor={(item) => item.key}
      />
      <Footer>
        <Back onPress={back}>Back</Back>
        <NewItemButton
          onPress={() => showTaskInfoPopup || setShowNewTaskPopup(true)}
        >
          Add Step
        </NewItemButton>
      </Footer>
      <Popup
        animationType="slide"
        transparent={true}
        visible={showNewTaskPopup}
        onRequestClose={() => {
          // Alert.alert("New Step has been closed.");
          setShowNewTaskPopup(false);
        }}
      >
        <CenterPopup>
          <PopupView>
            <PopupTitle>Step: {editing?recipe.tasks[selectedTask].ordinalId:recipe.tasks.length + 1}</PopupTitle>
            <InfoView>
              <PopupSpan>
              <PopupText>Channel: </PopupText>
                <Selector
                  data={Object.keys(Channel)}
                  defaultValue={newTaskChannel.name}
                  onSelect={(item)=>{changeChannel(Channel[item])}}
                  buttonTextAfterSelection={(item) => {
                    return item;
                  }}
                  rowTextForSelection={(item) => {
                    return item;
                  }}/>
              </PopupSpan>
              <PopupSpan>
                <PopupText>Time:</PopupText>
                <NumberEntry
                  style={timeIsValid||{backgroundColor:theme.colors.ui.error}}
                  onChangeText={timeInputHandler}
                  value={newTaskTime&&newTaskTime.toString()}
                  keyboardType="numeric"
                  onSubmitEditing={softSubmit}
                />
                <PopupText>minutes</PopupText>
              </PopupSpan>
              <PopupText>Instructions:</PopupText>
              <TextAreaEntry
                style={instructionsAreValid||{backgroundColor:theme.colors.ui.error}}
                onChangeText={instructionsInputHandler}
                value={newTaskInstructions}
                onSubmitEditing={softSubmit}
                multiline
              />
            </InfoView>
            <SmallButton onPress={editing?saveChanges:newTaskButtonHandler}>{editing?"Save":"Add"}</SmallButton>
            <ClosePopup onPress={() => setShowNewTaskPopup(false)}>
              X
            </ClosePopup>
          </PopupView>
        </CenterPopup>
      </Popup>
      <Popup
        animationType="slide"
        transparent={true}
        visible={showTaskInfoPopup}
        onRequestClose={() => {
          // Alert.alert("Step Info has been closed.");
          setShowTaskInfoPopup(false);
        }}
      >
        {recipe.tasks.length ? (
          <CenterPopup>
            <PopupView>
              <PopupTitle>
                Step: {recipe.tasks[selectedTask].ordinalId}
              </PopupTitle>
              <InfoView>
                <PopupText>
                  Channel: {recipe.tasks[selectedTask].channel.name}
                </PopupText>
                <PopupText>
                  Time: {formatTime(recipe.tasks[selectedTask].time)}
                </PopupText>
                <PopupText>Instructions:</PopupText>
                <MyCaption>
                  -- {recipe.tasks[selectedTask].instructions}
                </MyCaption>
              </InfoView>
              <StepInfoActionsSpan>
                <IconButton
                  icon="delete"
                  onPress={handleRemoveStep}
                  size={40}
                  />
                <SmallButton onPress={changeInfoToEdit}>Edit</SmallButton>
              </StepInfoActionsSpan>
              <ClosePopup onPress={() => setShowTaskInfoPopup(false)}>
                X
              </ClosePopup>
            </PopupView>
          </CenterPopup>
        ) : null}
      </Popup>
      <Popup animationType="fade"
        transparent={true}
        visible={showAddAnotherTaskPopup}
        onRequestClose={() => {
          // Alert.alert("Popup has been closed unexpectedly.");
          setShowAddAnotherTaskPopup(false);
        }}
      >
        <CenterPopup>
          <MiniPopupView>
            <SmallPopupTitle>Would you like to add another step?</SmallPopupTitle>
            <PopupSpan>
              <SmallButton onPress={SAATP_yes}>Yes</SmallButton>
              <SmallButton onPress={SAATP_no}>No</SmallButton>
            </PopupSpan>
          </MiniPopupView>
        </CenterPopup>
      </Popup>
      <Popup animationType = "fade"
      transparent={true}
      visible={showConfirmDeletePopup}
      onRequestClose={()=>{
        setShowConfirmDeletePopup(false)
      }}>
        <CenterDarkenPopup>
          <MiniPopupView>
            <SmallPopupTitle>Are you shure you would like to delete this?</SmallPopupTitle>
            <PopupSpan>
              <SmallButton onPress={handleRemoveCancel}>No</SmallButton>
              <SmallButton onPress={handleRemoveConfirm}>Yes</SmallButton>
            </PopupSpan>
          </MiniPopupView>
        </CenterDarkenPopup>
      </Popup>
    </>
  );
}
