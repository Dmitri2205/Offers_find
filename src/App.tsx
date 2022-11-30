import React,{ useState, useEffect, useRef, useLayoutEffect, Suspense } from "react";
import Header from "@modules/header/Header";
import Content from "@modules/content/Content";
import { AppColors, ApplicationWraper } from "@styles/global";
import { loadStores, storesSlice } from "./store/reducers/StoresSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { getUserGeolocation } from "./store/reducers/CoordsSlice";
import { Route, Routes } from "react-router-dom";
import { NotSupportedDevice } from "@modules/content/ContentStyles";
import { Button, Spinner } from "react-bootstrap";
import { callToaster, mountToast } from './hooks/useToaster';
import StoresList from "@modules/content/StoresList/StoresList";
import ScanProduct from "@modules/ScanProduct";


const Aside = React.lazy(()=>import("@modules/header/aside/Aside"));
const StoreDetails = React.lazy(()=>import("@modules/StoreDetails"));
const MainMap = React.lazy(()=>import("@modules/Map/MainMap"));
const ToBuy = React.lazy(()=>import("@modules/ToBuy/ToBuy"));

export default function App() {
  // const { setStores } = storesSlice.actions; //сеттер магазинов
  const { stores } = useAppSelector((state) => state.storesReducer); //селектор магазинов
  const { coords, loading } = useAppSelector((state) => state.coordsReducer); //селектор координат
  const dispatch = useAppDispatch(); // диспатч сеттера для редуктора
  
  const [mapShown, setMapShown] = useState<boolean>(false);
  const [menuOpened, setMenuOpened] = useState<boolean>(false);
  const [locationState,setLocationState] = useState<string>("idle")
  
  const asideMenu = useRef(null);
  
  const isLocationOn = navigator.permissions.query({name:"geolocation"});
  isLocationOn.then((result)=>{
      setLocationState(result.state.toString());
  });

useLayoutEffect(()=>{
  mountToast();
},[])


  useEffect(()=>{
    console.log(locationState);
    if(locationState === "prompt"){
      callToaster("warning","Включите геолокацию")
    }
    if(locationState === "denied" ){
      callToaster("error","Вам нужно разрешить использование геолокации")
    }
    if(locationState === "granted"){
      dispatch(getUserGeolocation());
    }
  },[locationState])

  useEffect(() => {
    const { current } = asideMenu;
    current.addEventListener("click", asideClickHandler);
    return () => {
      current.removeEventListener("click", asideClickHandler);
    };
  }, []);

  const asideClickHandler = (e: Event) => {
    const { target, currentTarget } = e;
    console.log(e);
    // if (currentTarget.classList.contain("aside-menu")) {
    
    // }
  };

  useEffect(() => {
    if (coords.length !== 0 && stores.length === 0)
      dispatch(loadStores(coords));
  }, [coords]);

  return (
    <ApplicationWraper>
      <Content>
        <Header
          mapShown={mapShown}
          setMapShown={setMapShown}
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
            <Route index element={<StoresList />} />
            <Route path="store/:storeSap" element={<StoreDetails />}/>
            <Route path="map" element={<MainMap />} />
            <Route path="scan" element={<ScanProduct/>}/>
            <Route path="toBuy" element={<ToBuy />}/>
          </Routes>
        </Suspense>
        )}
        {
          locationState === "prompt" || locationState === "denied" ?
          <>
          <br/>
          <Button style={{backgroundColor:AppColors.purple}} onClick={(e:any)=> {
            dispatch(getUserGeolocation())
          }}>
            Включить геолокацию
          </Button>
          </>
          :
          null
        }
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
