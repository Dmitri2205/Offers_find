import React, { JSXElementConstructor, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { storesSlice } from "../store/reducers/StoresSlice";
import { storesList } from "./content/StoresList/StoresList";
import { api } from "@API";
import { Detail, DetailsWraper } from "@styles/DetailsStyles";
import * as moment from "moment";

type offersType = {
  offers: any;
};

const StoreDetails = (props: any) => {
  const [loading, isLoading] = useState<boolean>(false);
  const [storeIndex,setStoreIndex] = useState<number | null>(null);

  const { setStoreOffers } = storesSlice.actions;
  const { stores } = useAppSelector((state) => state.storesReducer);
  const dispatch = useAppDispatch();

  const params = useParams();
  moment.locale('ru');

  useEffect(() => {
    let currentStore: number = stores.findIndex(
      (store: storesList, i: number): boolean => {
        return store.sap_code === params.storeSap
  });
    setStoreIndex(currentStore);
    if (!stores[currentStore].offers) {
      isLoading(true);
      api.getItems(params.storeSap)
        .then((res: any) => {
          dispatch(setStoreOffers({data:res.data.results,storeIndex: currentStore}));
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          isLoading(false);
        });
    }
  }, [stores]);

  const renderOffers = (): any => {
    console.log(storeIndex);
    let arr = [];
    if (stores[storeIndex] && stores[storeIndex].offers) {
      arr = stores[storeIndex].offers.map((offer: any, i: number) => {
        const {name,img_link,promo,current_prices} = offer;
        return (
          <Detail key={`detail${i}`}>
            <h5>{name}</h5>
            <img src={img_link}/>
            <p>
              <b>Закончится через: </b><span>{moment().to(promo.date_end)}</span>
            </p>
            <p>
            <span>Цена по скидке: {current_prices.price_promo__min}</span>
              <br/>
            <span>Цена без скидки: {current_prices.price_reg__min}</span>
            <br />
            <p>{"Экономим: " + (Number(current_prices.price_reg__min) - Number(current_prices.price_promo__min)).toFixed(2) + "₽"}</p>
            </p>
          </Detail>
        );
      });
    }
    return arr;
  };

  return <DetailsWraper>{loading ? <p>Обожди...</p> : renderOffers()}</DetailsWraper>;
};

export default StoreDetails;
