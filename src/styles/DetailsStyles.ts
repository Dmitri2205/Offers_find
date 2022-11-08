import styled from "styled-components";
import { Card, Button, ListGroup } from "react-bootstrap";

export const DetailsWraper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color:grey;
  padding-top:8px;
  & .CustomCard{
    width:calc(50% - 4px);
    font-size:12px;
    margin-bottom:8px;
    & .card-body{
      padding-bottom:4px;
    }
    & .card-img-top {
      width:100px;
      height:100px;
      margin:auto;
    }
    & .card-title{
      font-size:.75rem;
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
  h5 {
    margin: 0 auto;
  }
  img {
    width: 100px;
    height: 100px;
    border-radius: 8px;
  }
`;
