import { List } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import styled from "styled-components/native";

export const Title = styled.Text`
  text-align: center;
  padding: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[4]};
  color: ${(props) => props.theme.colors.ui.quaternary};
  font-size: ${(props) => props.theme.fontSizes.h2};
`;
export const SmallTitle = styled.Text`
  padding: ${(props) => props.theme.space[3]};
  color: ${(props) => props.theme.colors.ui.quaternary};
  font-size: ${(props) => props.theme.fontSizes.h3};
`;
export const Links = styled.View`
  flex-grow: 1;
  flex-direction: column;
  margin-top: ${(props) => props.theme.space[3]};
`;
export const Link = styled.Text`
  text-align: center
  margin-horizontal: ${(props) => props.theme.space[4]}
  margin-vertical: ${(props) => props.theme.space[3]}
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  color: ${(props) => props.theme.colors.ui.primary};
  font-size: ${(props) => props.theme.fontSizes.h3}
`;
export const Content = styled.View`
  flex-grow: 1;
`;
export const MyList = styled.FlatList.attrs({
  contentContainerStyle: {
    padding: 16,
  },
})`
  flex: 1;
`;
export const ListItem = styled.Text`
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  font-size: ${(props) => props.theme.fontSizes.h4};
  margin-bottom: ${(props) => props.theme.space[2]};
`;

export const ListItemView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  margin-bottom: ${(props) => props.theme.space[2]};
`;
export const Footer = styled.View`
  flex-direction: row;
  margin: ${(props) => props.theme.space[3]};
`;
export const Back = styled.Text`
  padding-vertical: ${(props) => props.theme.space[2]};
  padding-horizontal: ${(props) => props.theme.space[4]};
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  font-size: ${(props) => props.theme.fontSizes.h4};
`;
export const NewItemButton = styled.Text`
  flex-grow: 1;
  text-align: center;
  margin-left: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  font-size: ${(props) => props.theme.fontSizes.h4};
  padding-vertical: ${(props) => props.theme.space[2]};
`;
export const Popup = styled.Modal``;
export const CenterPopup = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export const PopupView = styled.View`
  width: 90%;
  flex: 1;
  align-items: center;
  border-radius: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.brand.secondary};
  margin: ${(props) => props.theme.sizes[2]};
`;
export const PopupTitle = styled.Text`
  padding:${(props) => props.theme.space[3]}
  color: ${(props) => props.theme.colors.ui.primary};
  font-size: ${(props) => props.theme.fontSizes.h3};
`;
export const ClosePopup = styled.Text`
  position:absolute;
  width:10%
  aspect-ratio:1;
  text-align:center;
  text-align-vertical:center;
  top: ${(props) => props.theme.space[0]};
  right: ${(props) => props.theme.space[0]};
  font-size: ${(props) => props.theme.fontSizes.h5};
  background-color: ${(props) => props.theme.colors.ui.quaternary};
  border: ${(props) => props.theme.colors.ui.secondary} ${(props) =>
  props.theme.borderSize[1]};
  border-radius: ${(props) => props.theme.space[2]};
`;
export const TextEntry = styled.TextInput`
  width:80%;
  border: ${(props) => props.theme.colors.ui.secondary} ${(props) =>
  props.theme.borderSize[2]};
  font-size: ${(props) => props.theme.fontSizes.h4};
  background-color: ${(props) => props.theme.colors.ui.tertiary}
  padding: ${(props) => props.theme.space[2]}
`;
export const TextAreaEntry = styled.TextInput`
  flex: 1;
  text-align-vertical: top;
  padding: ${(props) => props.theme.sizes[0]};
  margin: ${(props) => props.theme.sizes[1]};
  margin-top: ${(props) => props.theme.sizes[0]};
  font-size: ${(props) => props.theme.fontSizes.title};
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  border: ${(props) => props.theme.colors.ui.secondary}
    ${(props) => props.theme.borderSize[2]};
`;
export const SmallButton = styled.Text`
  width: 40%;
  text-align: center;
  border: ${(props) => props.theme.colors.ui.secondary}
    ${(props) => props.theme.borderSize[1]};
  border-radius: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  color: ${(props) => props.theme.colors.ui.primary};
  font-size: ${(props) => props.theme.fontSizes.h4};
  padding: ${(props) => props.theme.space[2]};
  margin: ${(props) => props.theme.space[3]};
`;
export const PopupText = styled.Text`
  padding: ${(props) => props.theme.space[1]};
  color: ${(props) => props.theme.colors.ui.primary};
  font-size: ${(props) => props.theme.fontSizes.h5};
  text-align-vertical: center;
`;
export const MyCaption = styled.Text`
  color: ${(props) => props.theme.colors.ui.primary};
  font-size: ${(props) => props.theme.fontSizes.body};
  padding-horizontal: ${(props) => props.theme.space[4]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;
export const InfoView = styled.View`
  flex: 1;
  width: 100%;
  padding-horizontal: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;
export const NumberEntry = styled.TextInput`
  width:50%;
  border: ${(props) => props.theme.colors.ui.secondary} ${(props) =>
  props.theme.borderSize[2]};
  font-size: ${(props) => props.theme.fontSizes.h5};
  background-color: ${(props) => props.theme.colors.ui.tertiary}
  padding: ${(props) => props.theme.space[1]}
  margin-top:${props=>props.theme.space[1]}
`;
export const PopupSpan = styled.View`
  flex-direction: row;
  width: 100%;
`;
export const CollapsedList = styled(List.Accordion)`
  align-items: center;
  background-color: ${(props) => props.theme.colors.ui.quaternary};
`;
export const CollapsedListItem = styled(List.Item)`
  background-color: ${(props) => props.theme.colors.ui.secondary};
`;
export const Group = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: ${(props) => props.theme.sizes[0]};
`;
export const SimpleText = styled.Text`
  text-align-vertical:center;
  color:${(props) => props.theme.colors.ui.quaternary}
  font-size:${(props) => props.theme.fontSizes.h5};
`;
export const Selector = styled(SelectDropdown)``;
export const RTIView = styled.View`
  flex: 1;
`;
export const RTIView2 = styled.View`
  justify-content: space-between;
`;
export const RTIButton = styled.Text`
  text-align:center;
  font-size: ${(props) => props.theme.fontSizes.h4}
  background-color: ${(props) => props.theme.colors.brand.primary}
  border-radius: ${(props) => props.theme.sizes[1]};
`;
export const RTIHeader = styled.Text`
  text-align-vertical: center;
  padding: ${(props) => props.theme.space[1]};
  color: ${(props) => props.theme.colors.ui.primary};
  font-size: ${(props) => props.theme.fontSizes.h5};
`;
export const RTITimeStamp = styled.Text`
  text-align:right;
  text-align-vertical: center;
  padding: ${(props) => props.theme.space[1]};
  color: ${(props) => props.theme.colors.ui.primary};
  font-size: ${(props) => props.theme.fontSizes.title};
`;
export const RLText = styled.Text`
  flex:1;
  font-size: ${(props) => props.theme.fontSizes.h4};
  padding: ${props=>props.theme.sizes[0]}
`;
export const RLText2 = styled.Text`
  font-size: ${(props) => props.theme.fontSizes.h4};
  padding:${props=>props.theme.sizes[0]}
`;
export const RLWrapper = styled.View`
  width:100%;
  flex:1;
  align-items:center;
`
export const RLPressable = styled.TouchableWithoutFeedback``;
export const MiniPopupView = styled.View`
  width: 90%;
  align-items: center;
  border-radius: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.brand.secondary};
`;
export const SmallPopupTitle = styled.Text`
  text-align:center;
  padding:${(props) => props.theme.space[3]}
  color: ${(props) => props.theme.colors.ui.primary};
  font-size: ${(props) => props.theme.fontSizes.h4};
`;