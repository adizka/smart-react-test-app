import React from "react";
import { GuestsList } from "./GuestsList";
import { GUESTS_TYPES } from "../../_core/consts";

export function Guests({ accommodation }) {
  return (
    <>
      {!accommodation && <></>}

      <div className="room__row">
        <GuestsList
          title="Economy"
          guests={accommodation[GUESTS_TYPES.economy]}
        />
        <GuestsList
          title="Premium"
          guests={accommodation[GUESTS_TYPES.premium]}
        />
      </div>

      <div className="room__row">
        {/* Empty */}
        <GuestsList />
        <GuestsList
          title="Economy in premium"
          guests={accommodation[GUESTS_TYPES.economInPremium]}
        />
      </div>

      <div className="room__row">
        <GuestsList
          title="Disabled economy"
          guests={accommodation[GUESTS_TYPES.economyDisabled]}
        />
        <GuestsList
          title="Disabled premium"
          guests={accommodation[GUESTS_TYPES.premiumDisabled]}
        />
      </div>
    </>
  );
}
