import React, { useState, useEffect, useMemo } from "react";
import { Content as ContentWraper } from "./ContentStyles";

interface ContentProps {
  children?:any;
}

const Content = ({children }: ContentProps) => {
  
  return (
    <ContentWraper>
      {children}
    </ContentWraper>
  );
};

export default Content;
