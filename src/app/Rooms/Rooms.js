import React from "react";
import { convertPositiveInteger } from "../../_helpers/TypeConvertion";

export function Rooms({
  economyRoomsCount,
  setEconomyRoomsCount,
  premiumRoomsCount,
  setPremiumRoomsCount,
}) {
  const handleEconomyRoomsCountChange = (event) => {
    const val = convertPositiveInteger(event.target.value, economyRoomsCount);
    setEconomyRoomsCount(val);
  };

  const handlePremiumRoomsCountChange = (event) => {
    const val = convertPositiveInteger(event.target.value, premiumRoomsCount);
    setPremiumRoomsCount(val);
  };

  return (
    <div className="room">
      <div className="room__head">
        {/* Economy */}
        <div className="room__column">
          <h3 className="room__title text-center bg-red" role="columnheader">
            Economy
          </h3>
          <div className="room__counts">
            <label className="room__counts_title" htmlFor="economy-count">
              Available economy rooms count:
            </label>
            <input
              id="economy-count"
              className="room__input text-center"
              type="text"
              name="economy"
              onChange={handleEconomyRoomsCountChange}
              value={economyRoomsCount}
              pattern="[0-9]*"
            />
          </div>
        </div>
        {/* Premium */}
        <div className="room__column">
          <h3
            className="room__title text-center bg-premium"
            role="columnheader"
          >
            Premium
          </h3>
          <div className="room__counts">
            <label className="room__counts_title" htmlFor="premium-count">
              Available premium rooms count:
            </label>
            <input
              id="premium-count"
              className="room__input text-center"
              type="text"
              name="premium"
              value={premiumRoomsCount}
              onChange={handlePremiumRoomsCountChange}
              pattern="[0-9]*"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
