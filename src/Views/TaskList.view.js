import { useState } from "react";
import { Alert } from "react-native";
import { v4 as uuid } from "uuid";
import {
  SmallTitle,
  MyList,
  ListItem,
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
  SmallPopupTitle
} from "../Com/StyleComps";
import Channel  from "../Enums/Channel.enum";
import { formatTime } from "../Util/HelperFunctions";
import { theme } from "../Inf/themes";


export default function ({ back, recipe = {}, addTask = () => {} }) {
  let [selectedTask, setSelectedTask] = useState(0);
  let [showTaskInfoPopup, setShowTaskInfoPopup] = useState(false);
  let [showNewTaskPopup, setShowNewTaskPopup] = useState(false);
  let [newTaskChannel, changeChannel] = useState(Channel.Prep);
  let [newTaskTime, changeNewTaskTime] = useState(0);
  let [newTaskInstructions, changeInstructions] = useState("");
  let [showAddAnotherTaskPopup,setShowAddAnotherTaskPopup] = useState(false)
  let [instructionsAreValid,setInstructionsAreValid] = useState(true)
  let [timeIsValid,setTimeIsValid] = useState(true)


  const newTaskButtonHandler = (e) => {
    let earlyExit = false;
    if (!newTaskTime||!Number.isInteger(newTaskTime)) {
      setTimeIsValid(false)
      earlyExit= true;
    }
    if(!newTaskInstructions){
      setInstructionsAreValid(false)
      earlyExit=true;
    }
    if(earlyExit){
      return;
    }
    addTask({
      recipeTitle: recipe.title,
      key: uuid(),
      ordinalId: recipe.tasks.length + 1,
      channel: newTaskChannel,
      instructions: newTaskInstructions,
      time: newTaskTime,
    });
    changeChannel(Channel.Prep);
    changeNewTaskTime(0);
    changeInstructions("");
    setShowNewTaskPopup(false);
    setShowAddAnotherTaskPopup(true);
  };
  const softSubmit = (e) => {
    if (newTaskTime && newTaskInstructions) {
      newTaskButtonHandler(e);
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

  return (
    <>
      <SmallTitle>{recipe.title}</SmallTitle>
      <MyList
        data={recipe.tasks}
        renderItem={({ item, index }) => (
          <ListItem
            onPress={() => {
              if (!showNewTaskPopup) {
                setSelectedTask(index);
                setShowTaskInfoPopup(true);
              }
            }}
          >
            Step {item.ordinalId}: {formatTime(item.time)}
          </ListItem>
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
            <PopupTitle>Step: {recipe.tasks.length + 1}</PopupTitle>
            <InfoView>
              <PopupSpan>
              <PopupText>Channel: </PopupText>
                <Selector
                  data={Object.keys(Channel)}
                  defaultValueByIndex={0}
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
                  value={newTaskTime}
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
            <SmallButton onPress={newTaskButtonHandler}>Add</SmallButton>
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
    </>
  );
}
