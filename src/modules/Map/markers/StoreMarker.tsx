import React, { useEffect, useMemo } from "react";
import { Icon, LatLngExpression } from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";
import storeIcon from "@icons/storeIcon.svg";
import cart from "@icons/shopping-cart.svg";
import { Link } from "react-router-dom";
import moment from "moment";

interface IStoreProps {
    store:{
        coordinates:any, //LatLngExpression,
        sap_code: number,
        work_end_time: string,
        work_start_time: string,
        address: string,
        is_24h: boolean
    }
}

export const StoreMarker = ({store}:IStoreProps) => {

    const map = useMap()

    const {coordinates,sap_code,work_end_time,work_start_time,address} = store;

    const icon = new Icon({
        iconUrl: storeIcon,
        iconSize: [32, 32],
      });

    const marker = useMemo(()=>{
        const end = work_end_time.split(":")[0]+":"+work_end_time.split(":")[1]
        const start = work_start_time.split(":")[0]+":"+work_start_time.split(":")[1]
        return (
            <Marker
            position={[coordinates[0], coordinates[1]]}
            icon={icon}
            key={`${sap_code}`}
          >
            <Popup>
              <a href={`geo:${coordinates}`}>{address}</a>
            {!store.is_24h ?
                 <>
                <br/>
                    {`Закроется в ${end}`}
                <br/>
                    {`Откроется в ${start}`}
                 </>
                 :
                 "Круглосуточно"   
            }
            <br/>
              <Link to={`/store/${sap_code}`}><img src={cart} alt="cart" width={"20px"} height={"20px"}/>Посмотреть товары по акции</Link>
            </Popup>
          </Marker>
        )   
    },[store])

    return marker
}