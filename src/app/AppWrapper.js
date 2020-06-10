import React from "react";
import App from "./App";
import { AppContext } from "./AppContext";

export function AppWrapper() {
  return (
    <AppContext.Consumer>
      {(value) => <App loading={value.loading} />}
    </AppContext.Consumer>
  );
}
