import React from "react";
import { Totals } from "./Totals";
import { AppContext } from "../AppContext";

export function TotalsWrapper() {
  return (
    <AppContext.Consumer>
      {(value) => (
        <Totals
          economyTotal={value.results.economyTotalPrice}
          premiumTotal={value.results.premiumTotalPrice}
        />
      )}
    </AppContext.Consumer>
  );
}
