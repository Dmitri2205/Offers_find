import styled from "styled-components";
import { AppColors } from "@styles/global";

const {cream} = AppColors

export const Content = styled.main`
display:block;
width:100%;
height:100%;
position:relative;
@media (min-width:1025px){
    display:none;
}
a{
    color:black;
    text-decoration:none;
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