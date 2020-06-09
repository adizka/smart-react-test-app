import React from "react";

export function Totals({ economyTotal = 0, premiumTotal = 0 }) {
  return (
    <>
      <div className="room__row">
        <div className="room__column">
          <div className="box box-fluid box-center">
            <span
              className="badge badge-econom badge-lg"
              title="Economy rooms total price"
            >
              € {economyTotal}
            </span>
          </div>
        </div>
        <div className="room__column">
          <div className="box box-fluid box-center">
            <span
              className="badge badge-premium badge-lg"
              title="Premium rooms total price"
            >
              € {premiumTotal}
            </span>
          </div>
        </div>
      </div>
      <div className="room__total">
        <span className="room__total_title">Total:</span>
        <span
          className="badge badge-total badge-lg"
          title="All rooms total price"
        >
          € {economyTotal + premiumTotal}
        </span>
      </div>
    </>
  );
}
