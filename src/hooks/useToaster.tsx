import React,{MutableRefObject, useRef} from "react";
import { AppColors } from "@styles/global";   

   export const callToaster = (type: string,text: string): void => {
        const toaster = document.getElementById("Toasts");
        const toast = document.createElement("div");
        toast.innerHTML = text;
        toast.style.width = "35%";
        toast.style.borderRadius = "12px";
        toast.style.margin = "8px 0";
        toast.style.transition = "all .5s linear";
        toast.style.padding = "4px";
        switch(type){
            case "info":
                toast.style.backgroundColor = AppColors.purple;
                break;
            case "warning":
                toast.style.backgroundColor = AppColors.orange;
                break;
            case "succsess":
                toast.style.backgroundColor = "emerlad";
                break;
            case "error":
                toast.style.backgroundColor = "crimson";
                break;
            default:
                toast.style.backgroundColor = "white";
        }
        toaster.appendChild(toast);
        setTimeout(()=>{
            toast.style.opacity = "0";
        },4000)
        setTimeout(()=>{
            toaster.removeChild(toast);
        },5000)
    }

    export const mountToast = (): void =>{
            const toaster = document.createElement("div");
            toaster.style.display = "flex";
            toaster.style.flexDirection = "column";
            toaster.style.alignItems = "flex-end";
            toaster.style.width = "100vw";
            toaster.style.height = "auto";
            toaster.style.position = "absolute";
            toaster.style.top = "0";
            toaster.style.right = "0";
            toaster.style.zIndex = "99999";
            toaster.style.color = "white";
            toaster.id = "Toasts";
            toaster.style.pointerEvents = "none";
            const root = document.getElementById("root");
            root.appendChild(toaster);
    }