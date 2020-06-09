import React, { createContext, useMemo, useState } from "react";
import { calculateOptimalAccommodation } from "../_core/accommodationCalculation";
import { GUESTS_PRICES } from "../_core/consts";

const init = {
  economyRoomsCount: 2,
  premiumRoomsCount: 7,
  results: {},
};

const AppContext = createContext();
const AppProvider = ({ children, value = init }) => {
  const [economyRoomsCount, setEconomyRoomsCount] = useState(
    value.economyRoomsCount
  );
  const [premiumRoomsCount, setPremiumRoomsCount] = useState(
    value.premiumRoomsCount
  );

  const results = useMemo(() => {
    return calculateOptimalAccommodation(
      GUESTS_PRICES,
      economyRoomsCount,
      premiumRoomsCount
    );
  }, [economyRoomsCount, premiumRoomsCount]);

  const ctx = useMemo(() => {
    return {
      economyRoomsCount,
      setEconomyRoomsCount,
      premiumRoomsCount,
      setPremiumRoomsCount,
      results,
    };
  }, [
    economyRoomsCount,
    setEconomyRoomsCount,
    premiumRoomsCount,
    setPremiumRoomsCount,
    results,
  ]);
  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
