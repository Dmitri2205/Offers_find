import React,{useState} from "react";
import { Link } from "react-router-dom";
import {AsideBlock} from "../HeaderStyle"

interface AsideProps {
    menuOpened?: boolean;
}

const Aside: React.FC<AsideProps> = ({menuOpened}) => {
    
    const [navLinks] = useState([
        {
            name:'На главную',
            url:'/'
        },
        {
            name:'На карте',
            url:'/map'
        },
        {
            name:'Категории',
            url:'/categories'
        },
        {
            name:'',
            url:''
        },
        {
            name:'',
            url:''
        },
    ]);

    return (
        <AsideBlock menuOpened={menuOpened}>
            {
                navLinks.map((link,i)=>{
                    const {name,url} = link
                    return(<Link to={url} key={`navLink${i}`}>{name}</Link>)
                })
            }
        </AsideBlock>
    )
}

export default Aside;