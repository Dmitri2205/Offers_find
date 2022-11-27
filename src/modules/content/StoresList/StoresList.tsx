import { useState, useEffect, useRef,useMemo } from "react";
import { Stores, ListWraper, List } from "./ListStyles";
import logo5ka from "@icons/logo_5ka.svg";
import { coordsSlice } from "../../../store/reducers/CoordsSlice";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { Link } from "react-router-dom";
import scrollHelper from "@modules/scrollHelper";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";

export interface storesList {
  storesReducer: any,
  address: string,
  name: string,
  city_name: string,
  sap_code: string,
  work_end_time: string,
  work_start_time: string,
  state: string,
  store_sublease: Array<subleaseProps>
};

type subleaseProps = {
  type_icon: string;
  type_name: string;
};

const StoresList = () => {
  // const { setStores } = storesSlice.actions;
  const { setLocationBounds} = coordsSlice.actions;
  const { stores } = useAppSelector((state) => state.storesReducer); //селектор магазинов
  const dispatch = useAppDispatch(); // диспатч сеттера для редуктора

  const [locationType,setLocationType] = useState<string>('ближайшие');


  const storesRef = useRef(null);

  useEffect(() => {
    storesRef.current.addEventListener("scroll", scrollHandle, false);
  }, []);

  const scrollHandle = (event: any) => {
    scrollHelper(event);
  };

  const switchHandler = (type: string): void => {
    type = type.toLowerCase();
    setLocationType(type);
    dispatch(setLocationBounds(type))
  }

  const checkStoreIsOpen = (startTime: string,endTime: string): boolean => {
    const nowHours = new Date().getHours();
    const nowMinutes = new Date().getMinutes();
    const s = startTime.split(":");
    const [startHours,startMinutes] = s; 
    const e = endTime.split(":")
    const [endHours,endMinutes] = e;
    if(nowHours > parseInt(startHours) && nowHours < parseInt(endHours)){
      return true;
    }else{
      if(nowMinutes >= parseInt(startMinutes) && nowMinutes <= parseInt(endMinutes)){
        console.log("Hours seems closed. Equaling minutes")
        return true;
      }
      return false;
    }
  }

  const renderList = useMemo(()=>{
    return  stores.map((store: storesList, i: number) => {
      const {work_start_time,work_end_time} = store;
      return (
        <List key={`${store.sap_code}i`}>
          <Link to={`store/${store.sap_code}`}>
            <h4>{store.address}</h4>
            <p>
              <span>
                {store.work_start_time} - {store.work_end_time}
              </span>
            </p>
            {store.store_sublease ? (
              <div>
                {store.store_sublease.map(
                  (item: subleaseProps, i: number) => {
                    const itemType = item.type_name.toLowerCase();
                    if (itemType === "банкомат" || itemType === "кафе") {
                      return (
                        <label key={`fig${i}`}>
                          <img src={item.type_icon} />
                          <span>{item.type_name}</span>
                        </label>
                      );
                    }
                  }
                )}
              </div>
            ) : null}
            {checkStoreIsOpen(work_start_time,work_end_time) ? (
              <span className="active"></span>
            ) : null}
          </Link>
        </List>
      );
    })
  },[stores])

  return (
    <Stores className="stores-component">
      <label>
        <img src={logo5ka}></img>
        <h4>{`${locationType === 'все' ? 'Все' : 'Ближайшие к Вам'} магазины`}</h4>
      </label>
      <ButtonGroup aria-label="Button group">
        {
          ["Ближайшие","Все"].map((type: string,i)=>{
            return(
              <Button variant="secondary" onClick={e=>switchHandler(type)} key={`type${i}`}>{type}</Button>
            )
          })
        }
      </ButtonGroup>

      <ListWraper ref={storesRef} className="stores-list-wraper">
        {
        stores.length !== 0 ? 
         renderList
         : null
        }
      </ListWraper>
    </Stores>
  );
};

export default StoresList;

