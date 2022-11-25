import React,{ useState, useEffect,useRef } from "react";
import Header from "@modules/header/Header";
import Content from "@modules/content/Content";
import Aside  from "@modules/header/aside/Aside";
import StoresList  from "@modules/content/StoresList/StoresList";
import StoreDetails from '@modules/StoreDetails';
import { ApplicationWraper } from "@styles/global";
import { loadStores, storesSlice } from "./store/reducers/StoresSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getUserGeolocation } from './store/reducers/CoordsSlice';
import { Route, Routes } from "react-router-dom";
import { MainMap } from './modules/Map/MainMap';

export default function App() {
  // const { setStores } = storesSlice.actions; //сеттер магазинов
  const { stores } = useAppSelector((state) => state.storesReducer); //селектор магазинов
  const { coords } = useAppSelector((state) => state.coordsReducer); //селектор координат
  const dispatch = useAppDispatch(); // диспатч сеттера для редуктора

  const [mapShown, setMapShown] = useState<boolean>(false);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const asideMenu = useRef(null);

  useEffect(() => {
    dispatch(getUserGeolocation());
    const { current } = asideMenu;
    console.log(current)
    current.addEventListener("click", asideClickHandler);
    return () => {
      current.removeEventListener("click", asideClickHandler);
    };
  }, []);

  const asideClickHandler = (e: Event) => {
    const { target,currentTarget } = e;
    console.log(e)
    // if (target.classList.contain("aside-menu")) {
    // }
  };

  useEffect(() => {
    
  }, []);
  
  useEffect(() => {
    if (coords.length !== 0 && stores.length === 0) dispatch(loadStores(coords));
  }, [coords]);


  return (

    <ApplicationWraper>
      <Header
        mapShown={mapShown}
        setMapShown={setMapShown}
        setMenuOpened={setMenuOpened}
        menuOpened={menuOpened}
      >
        <Aside menuOpened={menuOpened} childRef={asideMenu}/>
      </Header>
      <Content>
        <Routes>
          <Route index element={<StoresList/>} />
          <Route path="store/:storeSap" element={<StoreDetails/>}/>
          <Route path="map" element={<MainMap/>}/>
        </Routes>
      </Content>
    </ApplicationWraper>
  );
}
