import React, { useState, useEffect, useMemo } from "react";
import { Content as ContentWraper } from "./ContentStyles";
import GoogleMapReact from "google-map-react";

interface ContentProps {
  location: any;
  mapShown:boolean;

}

const Content = ({ location,mapShown }: ContentProps) => {
  useEffect(() => {
    console.log(location);
  }, []);

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
      <div>
        { location && mapShown ?
          <GoogleMapReact
            bootstrapURLKeys={{ key:'AIzaSyAtsheN2llz1NrOyNqZxCbPf0n615ikaR4' }}
            defaultZoom={9}
            center={location.center}
            options={() => createMapOptions()}
          >

          </GoogleMapReact>
          :
          <p>тут контент</p>
        }
      </div>
    </ContentWraper>
  );
};

export default Content;
