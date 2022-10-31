import React, { EffectCallback, useEffect } from "react";
import Header from "@modules/header/Header";
import Content from "@modules/content/Content";
import { GlobalStyle, ApplicationWraper } from "@styles/global";
import { api } from "@API";

export default function App() {
  const [location, setLocation] = React.useState<string>("");

  useEffect((): void=> {
  //  getGeolocation();
  }, []);

  const getGeolocation = async (): Promise<any>=> {
    let bbox: string | void = null;
    const logPosition = (pos: any) => {
     const {latitude,longitude} = pos.coords;
     const bbox = [
      latitude,
      (latitude + 5),
       longitude,
       (longitude + 5)
     ];
      console.log(bbox);
      const stores = api.getStores(bbox);
      stores.then((res: any)=>{
        console.log(res);
      })
    };

    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(logPosition);
    };
    
  };

  return (
    <ApplicationWraper>
      <GlobalStyle />
      <Header />
      <Content/>
    </ApplicationWraper>
  );
}
