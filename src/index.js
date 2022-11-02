import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StoreDetails from "@modules/StoreDetails";
import { GlobalStyle} from "@styles/global";
import { store } from "@store/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
     <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/store/:storeSap" element={<StoreDetails/>} />
        <Route
          path="*"
          element={
            <main>
              <p>NO MATCH</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);
