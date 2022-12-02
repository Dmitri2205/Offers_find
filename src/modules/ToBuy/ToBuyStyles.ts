import styled from "styled-components";

export const StyledBody = styled.tbody`
    width:100%;
    &>tr>td{
        display:inline-flex;
        align-items:center;
        width:100%;
        &:not(:nth-child(2)){
            width:50px;
        }
        &:first-child{
            width:8px;
        }
        &:last-child{
            width:80px;
        }
    }
`