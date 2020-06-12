import React from "react";
import PropTypes from "prop-types";
import { convertPositiveInteger } from "../../_helpers/TypeConvertion";

function Rooms({
  economyRoomsCount,
  setEconomyRoomsCount,
  premiumRoomsCount,
  setPremiumRoomsCount,
}) {
  /* Reason of not using generic handlers => we are checking entering numbers first
   *
   * Source:
   * https://medium.com/front-end-weekly/react-quick-tip-easy-data-binding-with-a-generic-onchange-handler-fb0254a7094e
   * Generic onChange handler is great when you just need to update state whenever the text field value changes,
   * but it becomes less suitable when more functionality is needed for specific fields.
   * if you need to validate the format of an email address, or check the strength of a password,
   * custom handlers for those fields might be a more suitable solution.
   *
   */
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

Rooms.propTypes = {
  economyRoomsCount: PropTypes.number.isRequired,
  setEconomyRoomsCount: PropTypes.func.isRequired,
  premiumRoomsCount: PropTypes.number.isRequired,
  setPremiumRoomsCount: PropTypes.func.isRequired,
};

export { Rooms };
