import styled, { keyframes } from "styled-components";

const burgerSize = 24;

interface BurgerProps {
  menuOpened: boolean;
  onClick: () => void;
}

export const Header = styled.header((props) => {
  return `
    display:flex;
    justify-content:left;
    align-items:center;
    height:${burgerSize + 8}px;;
    background-color: peachpuff;
    `;
});

export const Navigation = styled.nav`
  display: inline-flex;
  justify-content: left;
  align-items: center;
  width:100%;
  padding:4px;
`;


export const Burger = styled.span<BurgerProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width:${burgerSize}px;
    height:${burgerSize}px;
    border-radius: 8px;
    background-color:cyan;
    border:1px solid black;
    position:relative;
    span{
        display: inline-flex;
        justify-content:center;
        align-items:center;
        width: ${burgerSize - 8}px;
        height: 2px;
        background-color: black;
        position: relative;
        margin:0;
        padding:0;
        border-radius: 100px;
        ${props => {
          return (props.menuOpened ? "transform:rotateZ(270deg);height:0px" : "transform:rotateZ(0deg)")
        }};
        transition:transform .3s linear;
        &::before,&::after{
            content:'';
            display:inline-flex;
            width:${burgerSize - 8}px;
            height:2px;
            background-color:black;
            position:absolute;
            border-radius: 100px;
            transition:all .3s ease-in;
        }
        &::before{
            top:6px;
            ${props => {
              return (props.menuOpened ? 
                "transform:rotateZ(45deg);top:-1px" :
                "transform:rotateZ(0deg)")
            }};
        }
        &::after{
            bottom:6px;
            ${props => {
              return (props.menuOpened ? 
                "transform:rotateZ(-45deg);top:-1px" :
                "transform:rotateZ(0deg)")
            }};
        }
    }
    `;