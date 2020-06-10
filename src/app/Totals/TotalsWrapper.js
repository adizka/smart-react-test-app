import React from "react";
import { Totals } from "./Totals";
import { useAppContext } from "../AppContext";

export function TotalsWrapper() {
  const { results } = useAppContext();
  return (
    <Totals
      economyTotal={results.economyTotalPrice}
      premiumTotal={results.premiumTotalPrice}
    />
  );
}
