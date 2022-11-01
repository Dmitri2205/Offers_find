import React from "react";
import { createBrowserRouter} from "react-router-dom";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <p>Error</p>,
    children: [
      {
        path: "/test",
        element: <p>Test</p>,
        errorElement: <p>Error</p>
      },
    ],
  },
]);
