import React from "react";
import { Guests } from "./Guests";
import { AppContext } from "../AppContext";

export function GuestsWrapper() {
  return (
    <AppContext.Consumer>
      {(value) => <Guests accommodation={value.results.accommodation} />}
    </AppContext.Consumer>
  );
}
