import styled, { keyframes } from "styled-components";

export const Stores = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height:100%;
  padding: 0 12px;
  & > label {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 12px auto;
    color: white;
    & > img {
      width: 24px;
      height: 24px;
      margin-right: 5px;
    }
  }
`;

export const ListWraper = styled.div`
  display: flex;
  justify-content: left;
  width: 100%;
  height: 99.6vh;
  flex-wrap: wrap;
  overflow:auto;
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
`;

const blink = keyframes`
from {
    background:transparent;
}
to{
    background:transparent;
}   
50%{
    background:limegreen;
} 
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 6px;
  width: calc(25% - 14px);
  height: 120px;
  text-align: center;
  border: 1px solid gray;
  border-radius: 10px;
  margin-bottom: 10px;
  position: relative;
  background-color: white;
  box-shadow: 2px 2px 8px -4px white;
  transform:rotateX(0deg);
  transform-origin:bottom;
  transition: all .2s linear;
  h4 {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-height: 36px;
    margin-top: 4px;
  }
  @media (max-width: 768px) {
    width: calc(25% - 26px);
  }
  @media (max-width: 568px) {
    width: calc(33.3% - 26px);
  }
  @media (max-width: 390px) {
    width: calc(100% - 14px);
    h4 {
      width: 90%;
      font-size: 14px;
    }
  }
  p {
    margin-top: 8px;
    font-size: 16px;
  }
  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 8px 0 0 8px;
    text-align: left;
    label {
      display: inline-flex;
      width: 24px;
      height: 24px;
      font-size: 12px;
      @media (max-width: 568px) {
        width: calc(33.3% - 26px);
      }
      & > img {
        width: 12px;
        height: 12px;
      }
      & > span {
      }
    }
  }
  span.active {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: limegreen;
    position: absolute;
    right: 4px;
    bottom: 4px;
    animation: ${blink} 1s infinite;
  }
`;
