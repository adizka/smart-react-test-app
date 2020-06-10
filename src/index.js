import React from "react";
import ReactDOM from "react-dom";
import "./_assets/scss/main.scss";
import Init from "./Init";
import { AppProvider } from "./app/AppContext";
import { AppWrapper } from "./app/AppWrapper";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Init>
    <AppProvider>
      <AppWrapper />
    </AppProvider>
  </Init>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
