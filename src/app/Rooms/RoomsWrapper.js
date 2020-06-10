import React from "react";
import { Rooms } from "./Rooms";
import { useAppContext } from "../AppContext";

export function RoomsWrapper() {
  const {
    economyRoomsCount,
    setEconomyRoomsCount,
    premiumRoomsCount,
    setPremiumRoomsCount,
  } = useAppContext();
  return (
    <Rooms
      economyRoomsCount={economyRoomsCount}
      setEconomyRoomsCount={setEconomyRoomsCount}
      premiumRoomsCount={premiumRoomsCount}
      setPremiumRoomsCount={setPremiumRoomsCount}
    />
  );
}
