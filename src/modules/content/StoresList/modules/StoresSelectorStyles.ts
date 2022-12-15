import { AppColors } from "@styles/global";
import styled from "styled-components";

export const StoresSelectorWraper = styled.div`
    display:flex;
    width:100%;
    height:140px;
    padding:8px;
    margin: 16px 0;
    overflow-x: hidden;
`

export const SelectorScrollTrack = styled.div`
    display:flex;
    width:auto;
    transform:translateX(0px);
`

export const SliderItem = styled.div`
    display:flex;
    flex-direction: column;
    width:5.7em;
    height:90%;
    margin: 0 12px;
    border-radius:12px;
    border:1px solid ${AppColors.purple};
    background-color:${AppColors.cream};
    color:${AppColors.gray};
    justify-content: center;
    align-items:center;
    pointer-events:none;
    &>span:last-child{
        font-size:.85em;
    }
    font-size:1em;
    &:first-child{
        margin-left:0;
    }
    &:last-child{
        margin-right:0;
    }
    img{
        width:50%;
        height:50%;
    }
`