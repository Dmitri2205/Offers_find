import React, { useState,useEffect, useRef } from "react";
import { SelectorScrollTrack, SliderItem, StoresSelectorWraper } from './StoresSelectorStyles';
import { useAppSelector } from "@hooks/index";
import { storesSlice } from "../../../../store/reducers/StoresSlice";
import logo_5ka from "@icons/logo_5ka.svg";
import useSlider from "@hooks/useSLider";

interface IStoresSelector {
    props:any | undefined
}

export default function StoresSelector(props: IStoresSelector){

const {stores,loading} = useAppSelector((state)=> state.storesReducer)

    const slider = useRef(null);
    (() => useSlider(slider))();

    const [storesNames] = useState([
        {
            name:"5ка1",
            logo:logo_5ka
        },
        {
            name:"5ка2",
            logo:logo_5ka
        },
        {
            name:"5ка3",
            logo:logo_5ka
        },
        {
            name:"5ка4",
            logo:logo_5ka
        },
        {
            name:"5ка5",
            logo:logo_5ka
        },
        {
            name:"5ка6",
            logo:logo_5ka
        },
        {
            name:"5ка7",
            logo:logo_5ka
        },

    ])
    return(
        <StoresSelectorWraper>
            <SelectorScrollTrack ref={slider}>
            {
                storesNames.map((store,i)=>{
                    const {name,logo} = store;
                    return(
                        <SliderItem key={name+i}>
                            <span className="choseStores"></span>
                            <img src={logo} alt={name}/>
                            <span>{name}</span>
                        </SliderItem>
                    )
                })
            }
            </SelectorScrollTrack>
        </StoresSelectorWraper>
    )
}