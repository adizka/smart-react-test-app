import React from "react";
import { Rooms } from "./Rooms";
import { AppContext } from "../AppContext";

export function RoomsWrapper() {
  return (
    <AppContext.Consumer>
      {(value) => (
        <Rooms
          economyRoomsCount={value.economyRoomsCount}
          setEconomyRoomsCount={value.setEconomyRoomsCount}
          premiumRoomsCount={value.premiumRoomsCount}
          setPremiumRoomsCount={value.setPremiumRoomsCount}
        />
      )}
    </AppContext.Consumer>
  );
}
