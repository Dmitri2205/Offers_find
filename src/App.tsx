import React, { useState, useEffect } from "react";
import Header from "@modules/header/Header";
import Content from "@modules/content/Content";
import { GlobalStyle, ApplicationWraper } from "@styles/global";
import { api } from "@API";
import { storesSlice } from './store/reducers/StoresSlice';
import { useAppDispatch } from "./hooks/redux";

export default function App() {

  const {setStores} = storesSlice.actions; //сеттер магазинов
  const dispatch = useAppDispatch(); // диспатч сеттера для редуктора

  const [location, setLocation] = useState<string | any>(null);
  const [mapShown, setMapShown] = useState<boolean>(false);

  useEffect((): void=> {
   getGeolocation();
   }, []);

  const getGeolocation = async (): Promise<any>=> {
    
    const logPosition = (pos: any) => {
     const {latitude,longitude} = pos.coords;
     const center = [
      latitude,
      longitude,
     ];
     const bounds = [latitude + 0.00000001, (latitude + 0.2), longitude, (longitude + 0.2)]
      setLocation({center,bounds});
    };

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(logPosition);
    };
    
  };

  useEffect(()=>{
    if(location){
      giveMeStores();
    }
  },[location])

  const giveMeStores = () => {
    const stores = api.getStoresInLocation(location);
    stores.then((res: any)=>{
      const {results} = res.data;
      dispatch(setStores(results));
    })
  }

  return (
    <ApplicationWraper>
      <GlobalStyle />
      <Header mapShown={mapShown} setMapShown={setMapShown}/>
      <Content location={location} mapShown={mapShown}/>
    </ApplicationWraper>
  );
}
