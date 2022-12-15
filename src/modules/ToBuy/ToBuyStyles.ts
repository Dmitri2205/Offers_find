import { AppColors } from "@styles/global";
import styled from "styled-components";

export const StyledBody = styled.tbody`
    width:100%;
    background-color: transparent !important;
    &>tr{
        border-radius:16px;
        margin: 8px 0;
        position:relative;
        overflow:hidden;
        background-color:${AppColors.grayGlass};
        backdrop-filter:blur(1px);
        box-shadow: 0px 2px 1.4em -13px ${AppColors.purple};
        &>td{
            display:inline-flex;
            align-items:center;
            width:100%;
            border-bottom:none;
            &:has(img){
                width:auto !important;
            }
            &:not(:nth-child(2)){
                width:80px;
            }
            &:first-child > div.countControl{
                display:inline-flex;
                align-self:center;
                justify-content:center;
                border-radius:8px;
                width:100%;
                border: 1px solid ${AppColors.purple};
                border-radius:8px;
                overflow:hidden;
                text-align: center;
                font-weight:bold;
                span:nth-child(2){
                    width:50%;  
                }
                span:not(:nth-child(2)){
                    background-color:${AppColors.cream};
                    color:${AppColors.purple};
                    width:36px;
                    
                }
                span:first-child{
                    margin-right: 2px;
                }
                span:last-child{
                    margin-left: 2px;
                }
            }
        }
        &:last-child{
            width:80px;
        }
        }
    }
`;
