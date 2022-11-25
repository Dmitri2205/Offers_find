import React,{useEffect} from "react"
import { createPortal } from "react-dom";


//TO DO 
//Сделать отдельный компонент кнопки для монтирования в портал
const TeleportedButton =({children,clickHandler})=>{
    const root = document.getElementById("root");
    const button = document.createElement("button");
    button.onclick = clickHandler;
    button.classList.add("teleportedButton");


    useEffect(()=>{
        root.appendChild(button);
        return () => {
            root.removeChild(button);
        }
    },[button,root]);
    return createPortal(children,button);
};

export default TeleportedButton;