import React from "react";
import { Icon, LatLngExpression } from "leaflet";
import {
  LayersControl,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";
import { MainMapContainer } from "@styles/MainMapStyles";
import {coordsSlice} from "../../store/reducers/CoordsSlice"
import { useAppDispatch, useAppSelector } from "../../hooks";
import "leaflet/dist/leaflet.css";
import storeIcon from "@icons/storeIcon.svg";
import * as moment from "moment";

export const MainMap: React.FC =  () => {
  moment.locale("ru");

  const icon = new Icon({
    iconUrl: storeIcon,
    iconSize: [32, 32],
  });


  const {coords:{center}} = useAppSelector(state => state.coordsReducer);
  const {stores} = useAppSelector(state => state.storesReducer);


  return (
    <MainMapContainer>
      <MapContainer center={[center.latitude,center.longitude]} zoom={13} scrollWheelZoom={true}>
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
          <LayersControl.BaseLayer name="Dark">
            <TileLayer
              noWrap={false}
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {stores.length !== 0 ?
        stores.map((store, i) => {
          const { lat, lon, address, work_end_time } = store;
          const untillTime = new Date();
          const s = work_end_time.split(":");
          untillTime.setHours(s[0]);
          untillTime.setMinutes(s[1]);
          untillTime.setSeconds(s[2]);
          return (
            <Marker position={[lat, lon]} icon={icon} key={`storeIcon${i}`}>
              <Popup>
                {address}
                <br />
                {`Закроется ${moment().to(untillTime)}`}
              </Popup>
            </Marker>
          );
        })
        :
        null
      }
      </MapContainer>
    </MainMapContainer>
  );
};
