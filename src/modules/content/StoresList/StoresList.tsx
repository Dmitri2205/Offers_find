import React, { useState, useEffect, useRef } from "react";
import { Stores, ListWraper, List } from "./ListStyles";
import logo5ka from "@icons/logo_5ka.svg";
import { api } from "@API";
import { storesSlice } from "../../../store/reducers/StoresSlice";
import { Link, Route } from "react-router-dom";
import scrollHelper from "@modules/scrollHelper";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { Spinner } from "react-bootstrap";

export type storesList = {
  storesReducer: any;
  address: string;
  name: string;
  city_name: string;
  sap_code: string;
  work_end_time: string;
  work_start_time: string;
  state: string;
  store_sublease: Array<subleaseProps>;
};

type subleaseProps = {
  type_icon: string;
  type_name: string;
};

const StoresList = () => {
  const { setStores } = storesSlice.actions;
  const { stores } = useAppSelector((state) => state.storesReducer); //селектор магазинов
  const { coords } = useAppSelector((state) => state.coordsReducer); //селектор координат
  const dispatch = useAppDispatch(); // диспатч сеттера для редуктора

  const [loading, isLoading] = useState<boolean>(false);

  useEffect(() => {
    if (coords.length !== 0) giveMeStores();
  }, [coords]);

  const giveMeStores = () => {
    if (stores.length === 0) {
      isLoading(true);
      const stores = api.getStoresAround(coords.bounds);
      stores
        .then((res: any) => {
          let result = res.data;
          result = result.replace(/^\w+[callback(]/gm, '' )
          result = result.slice(0,-2);
          JSON.stringify(result)
          
          const data = JSON.parse(result).data;
          const {features} = data;
          let normalizedResponse = []
          for(let el of features){
            const normalizedItem = {
              ...el.properties,
              coordinates:el.geometry.coordinates,
              sap_code:el.sap_code,

            }
            normalizedResponse.push(normalizedItem);
          }
          console.log(normalizedResponse)
          dispatch(setStores(normalizedResponse))
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => {
          isLoading(false);
        });
    }
  };
  const storesRef = useRef(null);

  useEffect(() => {
    storesRef.current.addEventListener("scroll", scrollHandle, false);
  }, []);

  const scrollHandle = (event: any) => {
    scrollHelper(event);
  };

  return (
    <Stores>
      <label>
        <img src={logo5ka}></img>
        <h4>Магазы</h4>
      </label>

      <ListWraper ref={storesRef}>
        {loading ? (
          <Spinner animation="border" variant="info" />
        ) : stores.length !== 0 ? (
          stores.map((store: storesList, i: number) => {
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
                  {store.state === "active" ? (
                    <span className="active"></span>
                  ) : null}
                </Link>
              </List>
            );
          })
        ) : null}
      </ListWraper>
    </Stores>
  );
};

export default StoresList;
