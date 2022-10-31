import React, { useState, useEffect, useMemo } from "react";
import { Content as ContentWraper } from "./ContentStyles";

interface ContentProps {
  props: any;
}

const Content = (props: any) => {
  return (
    <ContentWraper>
      <h1>Content</h1>
    </ContentWraper>
  );
};

export default Content;
