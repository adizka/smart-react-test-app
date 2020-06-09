import React from 'react';
import clsx from "clsx";
import {Rooms} from "./Rooms/Rooms";
import {Totals} from "./Totals/Totals";

function App({loading = false}) {
  return (
    <div className="container position-relative">
      <h1 className="main__title text-center">Room occupancy</h1>
      <h2 className="main__subtitle text-center">The optimal guests accommodation</h2>
      <div className={clsx({"content-loading": loading})} role="main">
        <Rooms />
        <div className="room__content">
          <Totals economyTotal={189} premiumTotal={1054} />
        </div>
      </div>
    </div>
  );
}

export default App;
