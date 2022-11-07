import React, { useState, useEffect, useMemo } from "react";
import { Content as ContentWraper } from "./ContentStyles";
import { MainMap } from "@modules/Map/MainMap";
import { useAppSelector } from "../../hooks";
import StoresList from "./StoresList/StoresList";
import { Route } from "react-router-dom";

interface ContentProps {
  location: any;
  mapShown: boolean;
  children?:any;
}

const Content = ({ location, mapShown,children }: ContentProps) => {
  const { stores } = useAppSelector((state) => state.storesReducer);

  const createMapOptions = () => {
    return {
      panControl: true,
      mapTypeControl: false,
      scrollwheel: true,
      minZoom: 2,
      maxZoom: 12,
    };
  };

  return (
    <ContentWraper>
      {children}
    </ContentWraper>
  );
};

export default Content;
