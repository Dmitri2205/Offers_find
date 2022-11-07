import React, { useState, useEffect,useRef } from "react";
import Header from "@modules/header/Header";
import Content from "@modules/content/Content";
import { ApplicationWraper } from "@styles/global";
import { api } from "@API";
import { storesSlice } from './store/reducers/StoresSlice';
import { useAppDispatch,useAppSelector } from "./hooks/redux";
import { Aside } from "@modules/header/aside/Aside";

export default function App() {

  const {setStores} = storesSlice.actions; //сеттер магазинов
  const {stores} = useAppSelector(state => state.storesReducer);
  const dispatch = useAppDispatch(); // диспатч сеттера для редуктора

  const [location, setLocation] = useState<string | any>(null);
  const [mapShown, setMapShown] = useState<boolean>(false);
  const [menuOpened,setMenuOpened] = useState<boolean>(false)

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
    if(location) giveMeStores();
  },[location])

  const giveMeStores = () => {
    if(stores.length === 0){
    const stores = api.getStoresInLocation(location);
    stores.then((res: any)=>{
      const {results} = res.data;
      dispatch(setStores(results));
    })
    .catch((error)=>{
      console.log(error.message);
    });
  }
  return stores;
  }

  return (
    <ApplicationWraper id="app-wraper">
      <Header mapShown={mapShown} setMapShown={setMapShown} setMenuOpened={setMenuOpened} menuOpened={menuOpened}/>
      <Content location={location} mapShown={mapShown}>
        <Aside menuOpened={menuOpened}/>
      </Content>
    </ApplicationWraper>
  );
}
