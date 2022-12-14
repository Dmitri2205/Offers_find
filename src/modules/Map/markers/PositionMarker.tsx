import React, { useEffect } from "react";
import { Icon } from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";
import location_marker from "@icons/location_marker.svg";
import { Link } from "react-router-dom";
import moment from "moment";

interface IPositionProps {
    position: any
}

export const PositionMarker = ({position}:IPositionProps) => {

    const locationIcon = new Icon({
        iconUrl: location_marker,
        iconSize: [32, 32],
      });

    const [latitude,longitude] = position;

    useEffect(()=>{
        console.log(position)
    },[])

    const icon = new Icon({
        iconUrl: location_marker,
        iconSize: [32, 32],
      });

    return (
        <Marker
        position={[position.latitude, position.longitude]}
        icon={icon}
        key={"PositionMarker"}
      >
        <Popup>
            "Вы здесь"
        </Popup>
      </Marker>
    )
}