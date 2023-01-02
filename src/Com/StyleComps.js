import { ShadowPropTypesIOS } from "react-native";
import styled from "styled-components/native";

export const Title = styled.Text`
  text-align: center;
  padding: ${(props)=> props.theme.space[3]};
  margin-top: ${(props)=> props.theme.space[4]}
  color: ${(props)=> props.theme.colors.ui.quaternary};
  font-size: ${(props)=>props.theme.fontSizes.h2};
`
export const SmallTitle = styled.Text`
  padding:${(props)=>props.theme.space[3]}
  color: ${(props)=>props.theme.colors.ui.quaternary};
  font-size: ${(props)=>props.theme.fontSizes.h3};
`
export const Links = styled.View`
  flex-grow: 1;
  flex-direction: column;
  margin-top: ${(props)=>props.theme.space[3]};
`
export const Link = styled.Text`
  text-align: center
  margin-horizontal: ${(props)=>props.theme.space[4]}
  margin-vertical: ${(props)=>props.theme.space[3]}
  background-color: ${(props)=>props.theme.colors.ui.tertiary};
  color: ${(props)=>props.theme.colors.ui.primary};
  font-size: ${(props)=>props.theme.fontSizes.h3}
`
export const Content = styled.View`
  flex-grow:1;
`
export const List = styled.FlatList.attrs({
  contentContainerStyle:{
    padding: 16,
  }
})``;
export const ListItem = styled.Text`
  text-align:center;
  background-color:${(props)=>props.theme.colors.ui.tertiary};
  font-size:${(props)=>props.theme.fontSizes.h4};
  margin-bottom:${(props)=>props.theme.space[2]};
`
export const Footer = styled.View`
  flex-direction:row;
  margin:${(props)=>props.theme.space[3]}
`
export const Back = styled.Text`
  padding-vertical:${(props)=>props.theme.space[2]};
  padding-horizontal:${(props)=>props.theme.space[4]};
  background-color: ${(props)=>props.theme.colors.ui.tertiary};
  font-size:${(props)=>props.theme.fontSizes.h4};
`
export const NewItemButton = styled.Text`
  flex-grow:1;
  text-align:center;
  margin-left:${(props)=>props.theme.space[3]};
  background-color:${(props)=>props.theme.colors.ui.tertiary};
  font-size:${(props)=>props.theme.fontSizes.h4};
  padding-vertical:${(props)=>props.theme.space[2]}
`
export const Popup = styled.Modal`
`
export const CenterPopup = styled.View`
  flex:1;
  justify-content:center;
  align-items:center;
  margin-bottom:${(props)=>props.theme.sizes[4]};
`
export const PopupView = styled.View`
  align-items:center;
  border-radius:${(props)=>props.theme.space[2]};
  background-color:${(props)=>props.theme.colors.brand.secondary};
  width: 90%;
`
export const PopupTitle = styled.Text`
  padding:${(props)=>props.theme.space[3]}
  color: ${(props)=>props.theme.colors.ui.primary};
  font-size: ${(props)=>props.theme.fontSizes.h3};
`
export const ClosePopup = styled.Text`
  position:absolute;
  width:10%
  aspect-ratio:1;
  text-align:center;
  text-align-vertical:center;
  top: ${(props)=>props.theme.space[0]};
  right: ${(props)=>props.theme.space[0]};
  font-size: ${(props)=>props.theme.fontSizes.h5};
  background-color: ${(props)=>props.theme.colors.ui.quaternary};
  border: ${(props)=>props.theme.colors.ui.secondary} ${(props)=>props.theme.borderSize[1]};
  border-radius: ${(props)=>props.theme.space[2]};
`
export const TextEntry = styled.TextInput`
  width:80%;
  border: ${(props)=>props.theme.colors.ui.secondary} ${(props)=>props.theme.borderSize[2]};
  font-size: ${(props)=>props.theme.fontSizes.h4};
  background-color: ${(props)=>props.theme.colors.ui.tertiary}
  padding: ${(props)=>props.theme.space[2]}
`
export const SmallButton = styled.Text`
  width: 40%;
  text-align:center;
  border: ${(props)=>props.theme.colors.ui.secondary} ${(props)=>props.theme.borderSize[1]};
  border-radius: ${(props)=>props.theme.space[2]};
  background-color: ${(props)=>props.theme.colors.ui.tertiary};
  color: ${(props)=>props.theme.colors.ui.primary};
  font-size: ${(props)=>props.theme.fontSizes.h4};
  padding: ${(props)=>props.theme.space[2]};
  margin:${(props)=>props.theme.space[3]};
`
export const PopupText = styled.Text`
padding:${(props)=>props.theme.space[1]}
color: ${(props)=>props.theme.colors.ui.primary};
font-size: ${(props)=>props.theme.fontSizes.h5};
`
export const Caption = styled.Text`
  color: ${(props)=>props.theme.colors.ui.primary};
  font-size:${(props)=>props.theme.fontSizes.body};
  padding-horizontal:${(props)=>props.theme.space[4]};
  padding-bottom:${(props)=>props.theme.space[2]};
`
export const InfoView = styled.View`
  width:100%;
  padding-horizontal: ${(props)=>props.theme.space[2]};
`