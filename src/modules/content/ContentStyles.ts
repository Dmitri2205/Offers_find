import styled from "styled-components";
import { AppColors } from "@styles/global";

const {cream} = AppColors

export const Content = styled.main`
display:block;
width:100%;
height:100%;
min-height:50vh;
position:relative;
@media (min-width:1025px){
    display:none;
}
a{
    color:black;
    text-decoration:none;
}
& .spinner-border {
  width:100px;
  height:100px;
  margin: auto;
  position:absolute;
  top:0;
  right:0;
  left:0;
  bottom:0;
}
`

export const NotSupportedDevice = styled.div`
display:none;
h1{
    color:${cream}
}
@media (min-width:1025px){
    display:block;
}
`