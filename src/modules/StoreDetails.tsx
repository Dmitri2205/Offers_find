import React, { JSXElementConstructor, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { storesSlice } from "../store/reducers/StoresSlice";
import { storesList } from "./content/StoresList/StoresList";
import { api } from "@API";
import StoresList from "./content/StoresList/StoresList";

type offersType = {
  offers: any;
};

const StoreDetails = () => {
  const [loading, isLoading] = useState<boolean>(false);

  const { setStores } = storesSlice.actions;
  const { stores } = useAppSelector((state) => state.storesReducer);

  let ThisStore: number;

  const params = useParams();

  //TO DO
  useEffect(() => {
    let currentStore: number = stores.findIndex(
      (store: storesList, i: number): boolean =>
        store.sap_code === params.sapCode
    );
    ThisStore = currentStore;
    if (stores[currentStore].offers?.length === 0) {
      isLoading(true);
      api
        .getItems(params.storeSap)
        .then((res) => {
          const newData = (stores[currentStore].offers = res);
          setStores(newData);
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
    console.log(stores[ThisStore])
    console.log("OFFERS: " + stores[ThisStore].offers)
    if (stores[ThisStore].offers && stores[ThisStore].offers.length !== 0) {
      stores[ThisStore].offers.map((offer: any, i: number) => {
        return (
          <div>
            <h5>{offer}</h5>
          </div>
        );
      });
    }
  };

  return <div>{loading && !stores[ThisStore].offers ? <p>Обожди...</p> : renderOffers()}</div>;
};

export default StoreDetails;
