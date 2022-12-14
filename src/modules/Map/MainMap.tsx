import React from "react";
import {
  LayersControl,
  MapContainer as Map,
  TileLayer,
  useMap,
} from "react-leaflet";
import { MainMapContainer } from "@styles/MainMapStyles";
import { useAppSelector } from "../../hooks";
import "leaflet/dist/leaflet.css";
import location_marker from "@icons/location_marker.svg";
import * as moment from "moment";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import { PositionMarker } from './markers/PositionMarker';
import { StoreMarker } from "./markers/StoreMarker";

const MainMap: React.FC = () => {
  moment.locale("ru");

  const {coords:{center}} = useAppSelector((state) => state.coordsReducer);
  const { stores,loading } = useAppSelector((state) => state.storesReducer);

  return (
    <MainMapContainer className="main-map-container">
      {
        loading === "pending" ?
        <Spinner animation="border" variant="info" />
        :
      <Map
        center={[center.latitude, center.longitude]}
        zoom={13}
        scrollWheelZoom={true}
        dragging={true}
        
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreet">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              noWrap={false}
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {stores.map((store, i) => <StoreMarker store={store} key={`store${store.sap_code}`} />)}
          <PositionMarker position={center}/>
      </Map>
      }
    </MainMapContainer>
  );
};

export default MainMap;