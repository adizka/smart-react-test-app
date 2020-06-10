import React, { createContext, useMemo, useState, useEffect } from "react";
import { calculateOptimalAccommodation } from "../_core/accommodationCalculation";
import { fetchData } from "../_core/guestsPricesServise";

const init = {
  economyRoomsCount: 1,
  premiumRoomsCount: 7,
  results: {},
  loading: false,
};

const AppContext = createContext();

const AppProvider = ({ children, value = init }) => {
  const [guestsData, setGuestsData] = useState({ loading: true, value: [] });
  const [economyRoomsCount, setEconomyRoomsCount] = useState(
    value.economyRoomsCount
  );
  const [premiumRoomsCount, setPremiumRoomsCount] = useState(
    value.premiumRoomsCount
  );

  const results = useMemo(() => {
    return calculateOptimalAccommodation(
      guestsData.value,
      economyRoomsCount,
      premiumRoomsCount
    );
  }, [guestsData.value, economyRoomsCount, premiumRoomsCount]);

  const ctx = useMemo(() => {
    return {
      economyRoomsCount,
      setEconomyRoomsCount,
      premiumRoomsCount,
      setPremiumRoomsCount,
      results,
      loading: guestsData.loading,
    };
  }, [
    economyRoomsCount,
    setEconomyRoomsCount,
    premiumRoomsCount,
    setPremiumRoomsCount,
    results,
    guestsData.loading,
  ]);

  // Load guests prices from server
  useEffect(() => {
    fetchData((data) => {
      setGuestsData({
        loading: false,
        value: data.guestsPrices,
      });
    });
  }, []);

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };
