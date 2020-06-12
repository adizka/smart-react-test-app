import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useContext,
} from "react";
import PropTypes from "prop-types";
import { calculateOptimalAccommodation } from "../_core/accommodationCalculation";
import { fetchData } from "../_core/guestsPricesServiсe";

const init = {
  economyRoomsCount: 1,
  premiumRoomsCount: 7,
  results: {},
  loading: true,
};

const AppContext = createContext();
const useAppContext = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children, value = init }) => {
  const [loading, setLoading] = useState(value.loading);
  const [prices, setPrices] = useState([]);
  const [economyRoomsCount, setEconomyRoomsCount] = useState(
    value.economyRoomsCount
  );
  const [premiumRoomsCount, setPremiumRoomsCount] = useState(
    value.premiumRoomsCount
  );

  const results = useMemo(() => {
    return calculateOptimalAccommodation(
      prices,
      economyRoomsCount,
      premiumRoomsCount
    );
  }, [prices, economyRoomsCount, premiumRoomsCount]);

  const ctx = useMemo(() => {
    return {
      economyRoomsCount,
      setEconomyRoomsCount,
      premiumRoomsCount,
      setPremiumRoomsCount,
      results,
      loading,
    };
  }, [
    economyRoomsCount,
    setEconomyRoomsCount,
    premiumRoomsCount,
    setPremiumRoomsCount,
    results,
    loading,
  ]);

  // Load guests prices from server
  useEffect(() => {
    let current = true;
    fetchData((data) => {
      if (current) {
        setLoading(false);
        setPrices(data.guestsPrices);
      }
    });
    return () => {
      current = false;
    };
  }, []);

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node,
  value: PropTypes.object,
};

AppProvider.defaultProps = {
  value: init,
};

export { AppContext, AppProvider, useAppContext };
