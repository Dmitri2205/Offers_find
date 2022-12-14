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
import { coordsSlice, getUserGeolocation } from "./store/reducers/CoordsSlice";
import { Route, Routes } from "react-router-dom";
import { NotSupportedDevice } from "@modules/content/ContentStyles";
import { Button, Spinner } from "react-bootstrap";
import { callToaster, mountToast } from "./hooks/useToaster";
import StoresList from "@modules/content/StoresList/StoresList";
import ScanProduct from "@modules/ScanProduct";

const Aside = React.lazy(() => import("@modules/header/aside/Aside"));
const StoreDetails = React.lazy(() => import("@modules/StoreDetails"));
const MainMap = React.lazy(() => import("@modules/Map/MainMap"));
const ToBuy = React.lazy(() => import("@modules/ToBuy/ToBuy"));

export default function App() {
  const { setCurrentPosition } = coordsSlice.actions; //сеттер позиции
  const { stores } = useAppSelector((state) => state.storesReducer); //селектор магазинов
  const { coords, loading } = useAppSelector((state) => state.coordsReducer); //селектор координат
  const dispatch = useAppDispatch(); // диспатч сеттера для редуктора

  const [mapShown, setMapShown] = useState<boolean>(false);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const [locationState, setLocationState] = useState<string>("idle");

  const asideMenu = useRef(null);
  
  useEffect(() => {
    mountToast();
    const isLocationOn = navigator.permissions.query({ name: "geolocation" });
    isLocationOn.then((result) => {
      console.log(result.state);
      setLocationState(result.state);
    });
    const { current } = asideMenu;
    current.addEventListener("click", asideClickHandler);
    return () => {
      current.removeEventListener("click", asideClickHandler);
    };
  }, []);
  
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };
  
  let watchId: any;
  
  useEffect(() => {
    if (locationState === "prompt") {
      callToaster("warning", "Включите геолокацию");
    }
    if (locationState === "denied") {
      callToaster("error", "Вам нужно разрешить использование геолокации");
    }
    if (locationState === "granted") {
      dispatch(getUserGeolocation()).then(() => {
        watchId = navigator.geolocation.watchPosition(
          onSuccessGeoWatch,
          onErrorGeoWatch,
          options
          );
        });
      }
    }, [locationState]);
    
  useEffect(() => {
    if (!coords.bounds.includes(undefined) && stores.length === 0 && locationState !== "idle") dispatch(loadStores(coords));
  }, [coords.bounds]);

  const onSuccessGeoWatch = (position: any): void => {
    console.log(position);
    console.log(position.heading);
    const { latitude, longitude } = position.coords;
    dispatch(setCurrentPosition({ latitude, longitude }));
  };

  const onErrorGeoWatch = (error: any) => {
    console.log(error);
    navigator.geolocation.clearWatch(watchId);
  };

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
        {locationState === "denied" ? (
          <>
            <br />
            <Button
              style={{ backgroundColor: AppColors.purple }}
              onClick={(e: any) => {
                dispatch(getUserGeolocation());
              }}
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
