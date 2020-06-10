import React from "react";
import App from "./App";
import { useAppContext } from "./AppContext";

export function AppWrapper() {
  const { loading } = useAppContext();
  return <App loading={loading} />;
}
