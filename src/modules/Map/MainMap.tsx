import React from "react";
import { Icon, LatLngExpression } from "leaflet";
import {
  LayersControl,
  MapContainer as Map,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { MainMapContainer } from "@styles/MainMapStyles";
import { useAppSelector } from "../../hooks";
import "leaflet/dist/leaflet.css";
import storeIcon from "@icons/storeIcon.svg";
import location_marker from "@icons/location_marker.svg";
import * as moment from "moment";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const MainMap: React.FC = () => {
  moment.locale("ru");

  const icon = new Icon({
    iconUrl: storeIcon,
    iconSize: [32, 32],
  });

  const locationIcon = new Icon({
    iconUrl: location_marker,
    iconSize: [32, 32],
  });

  const {coords: { center},} = useAppSelector((state) => state.coordsReducer);
  const { stores,loading } = useAppSelector((state) => state.storesReducer);

  return (
    <MainMapContainer className="main-map-container">
      {
        loading === "pending" ?
        <Spinner animation="border" variant="info" />
        :
        stores.length === 0 ?
        <p>error</p>
        :
      <Map
        center={[center.latitude, center.longitude]}
        minZoom={14}
        maxZoom={10}
        zoom={13}
        scrollWheelZoom={false}
        dragging={false}
        zoomControl={false}
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
        <Marker
          icon={locationIcon}
          position={[center.latitude, center.longitude]}
          key={"locationMarker"}
        />
        {stores.length !== 0
          ? stores.map((store, i) => {
              const { coordinates, address, work_end_time,sap_code} = store;
              let untillTime: string | Date = "";
              if (work_end_time) {
                untillTime = new Date();
                const s = work_end_time.split(":");
                untillTime.setHours(s[0]);
                untillTime.setMinutes(s[1]);
                untillTime.setSeconds(s[2]);
              }
              return (
                <Marker
                  position={[coordinates[0], coordinates[1]]}
                  icon={icon}
                  key={`storeIcon${i}`}
                >
                  <Popup>
                    <a href={`geo:${coordinates}`}>{address}</a>
                    <br />
                    {`Закроется ${moment().to(untillTime)}`}
                    <br/>
                    <Link to={`/store/${sap_code}`}>Посмотреть товары по акции</Link>
                  </Popup>
                </Marker>
              );
            })
          : null}
      </Map>
      }
    </MainMapContainer>
  );
};

export default MainMap;