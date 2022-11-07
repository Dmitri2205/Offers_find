import React, { useState, useEffect,useRef } from "react";
import { Stores, ListWraper, List } from "./ListStyles";
import logo5ka from "@icons/logo_5ka.svg";
import {api} from "@API";
import { Link } from "react-router-dom";
import scrollHelper from "@modules/scrollHelper"

export type storesList = {
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

const StoresList = ({ stores }: any) => {

  const storesRef = useRef(null)

  useEffect(()=>{
    storesRef.current.addEventListener('scroll',scrollHandle,false);
    // return () => {
    //   storesRef.current.removeEventListener('scroll',scrollHandle,false);
    // }
  },[])

  const scrollHandle = (event:any) => {
    scrollHelper(event);
  }

  return (
    <Stores>
      <label>
        <img src={logo5ka}></img>
        <h4>Магазы</h4>
      </label>

      <ListWraper ref={storesRef}>
        {stores.length !== 0
          ? stores.map((store: storesList, i: number) => {
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
          : null}
      </ListWraper>
    </Stores>
  );
};

export default StoresList;
