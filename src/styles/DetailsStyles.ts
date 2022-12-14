import styled from "styled-components";
import { AppColors } from "./global";
import { Button } from 'react-bootstrap';
import { burgerSize } from "@modules/header/HeaderStyle";


export const DetailsWraper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: grey;
  padding-top: 8px;
  & .CustomCard {
    width: calc(50% - 4px);
    font-size: 12px;
    margin-bottom: 8px;
    & .card-body {
      padding-bottom: 4px;
    }
    & .card-img-top {
      width: 100px;
      height: 100px;
      margin: auto;
    }
    & .card-title {
      font-size: 0.75rem;
      max-height: 27px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor:pointer;
    }
    & .list-group-item {
      padding: 4px 0;
    }
  }
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(25% - 34px);
  height: auto;
  margin: 12px;
  border: 1px solid black;
  border-radius: 8px;
  padding: 4px;
  background-color: white;
  position:relative;
  h5 {
    margin: 0 auto;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 8px;
  }
`;

export const AddButton = styled(Button)`
display:inline-flex;
justify-content:center;
align-items:center;
width:${burgerSize}px;
height:${burgerSize + 2}px;
border-radius:50%;
background-color:${AppColors.purple};
color:white;
font-weight:bold;
border: 1px dashed ${AppColors.gray};
position:absolute;
bottom:-2px;
right:-12px;
&:hover{
background-color:${AppColors.purple};
}
`
