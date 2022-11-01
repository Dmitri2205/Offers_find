import React, { useState, useEffect, useMemo } from "react";
import { Content as ContentWraper } from "./ContentStyles";
import GoogleMapReact from "google-map-react";
import { useAppSelector } from "../../hooks/redux";
import StoresList from "./StoresList/StoresList";

interface ContentProps {
  location: any;
  mapShown:boolean;

}

const Content = ({ location,mapShown }: ContentProps) => {
  
  const {stores} = useAppSelector(state => state.storesReducer);

  useEffect(() => {
    if(stores.length) console.log(stores)
  }, [stores]);

  const createMapOptions = () => {
    return {
      panControl: true,
      mapTypeControl: false,
      scrollwheel: true,
      minZoom:2,
      maxZoom:12
     }
  }

  return (
    <ContentWraper>
        { mapShown ?
        <div className="GoogleMapComponent">
          <GoogleMapReact
            bootstrapURLKeys={{ key:process.env.MAP_API_KEY }}
            defaultZoom={9}
            center={location.center}
            options={() => createMapOptions()}
          >

          </GoogleMapReact>
          </div>
          :
          <StoresList stores={stores}></StoresList>
        }
      
    </ContentWraper>
  );
};

export default Content;
