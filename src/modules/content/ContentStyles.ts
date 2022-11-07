import styled from "styled-components";

export const Content = styled.main`
display:flex;
width:100%;
height:100%;
position:relative;
a{
    color:black;
    text-decoration:none;
}
div:has(.GoogleMapComponent){
    width:100%;
    height:100%;
}
`