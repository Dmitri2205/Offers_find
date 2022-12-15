import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  Suspense,
} from "react";
import Header from "@modules/header/Header";
import Content from "@modules/content/Content";
import { AppColors, ApplicationWraper } from "@styles/global";
import { loadStores, storesSlice } from "./store/reducers/StoresSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Route, Routes } from "react-router-dom";
import { NotSupportedDevice } from "@modules/content/ContentStyles";
import { Button, Spinner } from "react-bootstrap";
import { mountToast } from "./hooks/useToaster";
import StoresList from "@modules/content/StoresList/StoresList";
import ScanProduct from "@modules/ScanProduct";
import {useGeolocation} from "@hooks/useGeolocation";

const Aside = React.lazy(() => import("@modules/header/aside/Aside"));
const StoreDetails = React.lazy(() => import("@modules/StoreDetails"));
const MainMap = React.lazy(() => import("@modules/Map/MainMap"));
const ToBuy = React.lazy(() => import("@modules/ToBuy/ToBuy"));

export default function App() {
  const { stores } = useAppSelector((state) => state.storesReducer); //селектор магазинов
  const { coords, loading } = useAppSelector((state) => state.coordsReducer); //селектор координат
  const dispatch = useAppDispatch();

  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const {locationPermission,refreshLocationState} = useGeolocation()


  const asideMenu = useRef(null);
  
  useEffect(() => {
    mountToast();
    const { current } = asideMenu;
    current.addEventListener("click", asideClickHandler);
    return () => {
      current.removeEventListener("click", asideClickHandler);
    };
  }, []);


    
  useEffect(() => {
    const boundsLoaded = coords.bounds.length !== 0;
    const storesEmpty = stores.length === 0
    const permissionGranted = locationPermission === "granted";  
    if (boundsLoaded && storesEmpty  && permissionGranted ) {
      console.log("%cReady to go!:" + "\n" + 
      `bounds loaded:${boundsLoaded} | stores is empty:${storesEmpty} | permission granted:${permissionGranted}`, 
      'color:darkslateblue;background-color:deepskyblue;font-size:14px;font-weight:bold;padding:6px;border-radius:8px;');
      dispatch(loadStores(coords));
    }
  }, [coords.bounds]);

  const asideClickHandler = (e: Event) => {
    const { target, currentTarget } = e;
    setMenuOpened(false);
    // if (currentTarget.classList.contain("aside-menu")) {

    // }
  };

  return (
    <ApplicationWraper>
      <Content>
        <Header
          setMenuOpened={setMenuOpened}
          menuOpened={menuOpened}
        >
          <Aside menuOpened={menuOpened} childRef={asideMenu} />
        </Header>
        {loading === "pending" ? (
          <Spinner animation="border" variant="info" />
        ) : (
          <Suspense fallback={"Loading"}>
            <Routes>
              <Route index element={<StoresList/>} />
              <Route path="store/:storeSap" element={<StoreDetails/>} />
              <Route path="map" element={<MainMap/>} />
              <Route path="scan" element={<ScanProduct/>} />
              <Route path="toBuy" element={<ToBuy/>} />
            </Routes>
          </Suspense>
        )}
        {locationPermission === "denied" || locationPermission === "prompt" ? (
          <>
            <br />
            <Button
              style={{ backgroundColor: AppColors.purple }}
              onClick={(e: any) => {refreshLocationState()}}
            >
              Включить геолокацию
            </Button>
          </>
        ) : null}
      </Content>
      <NotSupportedDevice>
        <h1>
          Ваше устройство не поддерживается. Откройте приложение с мобильного
          устройства
        </h1>
      </NotSupportedDevice>
    </ApplicationWraper>
  );
}
