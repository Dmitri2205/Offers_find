import styled, { keyframes } from "styled-components";
import { AppColors } from "@styles/global";

const { purple, gray } = AppColors;

export const burgerSize = 24;

interface BurgerProps {
  menuOpened: boolean;
  onClick?: () => void;
}

export const Header = styled.header((props) => {
  return `
    display:flex;
    justify-content:left;
    align-items:center;
    height:${burgerSize + 8}px;;
    background-color:${gray};
    position:sticky;
    top:0;
    left:0;
    z-index:9999;
    & .navbar {
      width:100%;
      height:100%;
      padding:0;
    }
    & img{
      width:24px;
      height:24px;
      margin-left:12px;
    }
    `;
});

export const Navigation = styled.nav`
  display: inline-flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  padding: 4px;
`;

export const Burger = styled.span<BurgerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${burgerSize}px;
  height: ${burgerSize}px;
  border-radius: 8px;
  background-color: ${gray};
  border: 1px solid slateblue;
  box-shadow: 0px 0px 7px ${AppColors.purple};
  position: relative;
  span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: ${burgerSize - 8}px;
    height: 2px;
    background-color: slateblue;
    position: relative;
    margin: 0;
    padding: 0;
    border-radius: 100px;
    ${(props) => {
      return props.menuOpened
        ? "transform:rotateZ(270deg);height:0px"
        : "transform:rotateZ(0deg)";
    }};
    transition: transform 0.3s linear;
    &::before,
    &::after {
      content: "";
      display: inline-flex;
      width: ${burgerSize - 8}px;
      height: 2px;
      background-color: ${purple};
      position: absolute;
      border-radius: 100px;
      transition: all 0.3s ease-in;
    }
    &::before {
      top: 6px;
      ${(props) => {
        return props.menuOpened
          ? "transform:rotateZ(45deg);top:-1px"
          : "transform:rotateZ(0deg)";
      }};
    }
    &::after {
      bottom: 6px;
      ${(props) => {
        return props.menuOpened
          ? "transform:rotateZ(-45deg);top:-1px"
          : "transform:rotateZ(0deg)";
      }};
    }
  }
`;


export const AsideBlock = styled.div(({ menuOpened }: BurgerProps) => {
  return `
      display:flex;
      flex-direction:column;
      justify-content: flex-start;
      align-items:flex-start;
      width:268px;
      height:95.4vh;
      position:fixed;
      top:4.5vh;
      padding-left:8px;
      border-top-right-radius:8px;
      border-bottom-right-radius:8px;
      border:1px solid ${purple};
      border-left:none;
      ${menuOpened ? `box-shadow: 0px 8px 8px ${AppColors.purple}` : null};
      ${menuOpened ? "left:0" : "left:-268px"};
      background-color:${gray};
      transition: all .3s linear;
      && > a{
        display:inline-flex;
        margin-bottom:8px;
        color:gainsboro;
        text-decoration:none;
        &:first-child{
          margin-top:12px;
        }
        & .link-icon {
          display:inline-flex;
          font-size:8px;
          & > img{
            margin:0
          }
        }
      }
      & > p{
        font-size:8px;
        color:${purple};
        position:absolute;
        bottom:0;
        left:0;
      }
      & > #category-dropdown{
        padding:0;
      }
    `;
});
