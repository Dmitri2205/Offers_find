import { coordsSlice, getUserGeolocation } from "../store/reducers/CoordsSlice";
import React,{useEffect, useLayoutEffect, useState} from "react";
import { useAppDispatch } from ".";
import { callToaster } from "./useToaster";

export function useGeolocation(){
    const { setCurrentPosition } = coordsSlice.actions;
    const dispatch = useAppDispatch();
    const refreshLocationState = () => dispatch(getUserGeolocation());
    const [locationPermission,setLocationState] = useState<PermissionState>(null);

    let watchId: any;
    const geoOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      };

      let permissionWatcher:PermissionStatus;
      
      useEffect(() => {
        const isLocationOn = navigator.permissions.query({ name: "geolocation" });
        isLocationOn.then((permission) => {
          permissionWatcher = permission;
          permissionWatcher.onchange = (e:any) => setLocationState(e.target.state);    
          setLocationState(permission.state);
        });
        if (locationPermission === "prompt") {
          callToaster("warning", "Включите геолокацию");
        }
        if (locationPermission === "denied") {
          callToaster("error", "Вам нужно разрешить использование геолокации");
        }
        if (locationPermission === "granted") {
          dispatch(getUserGeolocation()).then(() => {
            watchId = navigator.geolocation.watchPosition(
              onSuccessGeoWatch,
              onErrorGeoWatch,
              geoOptions
              );
            });
          }
    }, [locationPermission])

      const onSuccessGeoWatch = (position: any): void => {
        const { latitude, longitude } = position.coords;
        dispatch(setCurrentPosition({ latitude, longitude }));
      };
    
      const onErrorGeoWatch = (error: any) => {
        console.log(error);
        navigator.geolocation.clearWatch(watchId);
      };
    
    return {locationPermission,refreshLocationState};
}