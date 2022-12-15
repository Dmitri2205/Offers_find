import { useState, useEffect, useRef,useMemo } from "react";
import { Stores, ListWraper, List } from "./ListStyles";
import logo5ka from "@icons/logo_5ka.svg";
import { coordsSlice } from "../../../store/reducers/CoordsSlice";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { Link } from "react-router-dom";
import scrollHelper from "@modules/scrollHelper";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import StoresSelector from "./modules/StoresSelector";

export interface IStoresList {
  storesReducer: any,
  address: string,
  name: string,
  city_name: string,
  sap_code: string,
  work_end_time: string,
  work_start_time: string,
  state: string,
  store_sublease: Array<subleaseProps>,
  is_24h: boolean
};

type subleaseProps = {
  type_icon: string;
  type_name: string;
};

const StoresList = () => {
  // const { setStores } = storesSlice.actions;
  const { setLocationBounds} = coordsSlice.actions;
  const { stores } = useAppSelector((state) => state.storesReducer);
  const dispatch = useAppDispatch();
  const storesRef = useRef(null);

  useEffect(() => {
    storesRef.current.addEventListener("scroll", scrollHandle, false);
  }, []);

  const scrollHandle = (event: any) => {
    scrollHelper(event);
  };

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
    return  stores.map((store: IStoresList, i: number) => {
      const {work_start_time,work_end_time} = store;
      return (
        <List key={`${store.sap_code}i`}>
          <Link to={`store/${store.sap_code}`}>
            <label className="d-inline-flex flex-row justify-center align-items-center w-90 m-2">
            <img src={logo5ka} alt="shop_logo" style={{marginRight:"4px"}}></img>
            <h4>{store.address}</h4>
            </label>
            <p>
              <span>
                {!store.is_24h ?
                  `${store.work_start_time} - ${store.work_end_time}`
                  :
                  "Круглосуточно"
                }
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
                          <img src={item.type_icon} alt="store_sublease_icon"/>
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
      <StoresSelector props />
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

