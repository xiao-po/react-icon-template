import * as React from "react";
import * as ReactDom from "react-dom";
import App from "./app";

import "./index.scss";
import { BrowserRouter } from "react-router-dom";

ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
