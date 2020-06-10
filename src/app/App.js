import React from 'react';
import clsx from "clsx";
import {RoomsWrapper} from "./Rooms/RoomsWrapper";
import {GuestsWrapper} from "./Guests/GuestsWrapper";
import {TotalsWrapper} from "./Totals/TotalsWrapper";

function App({loading = false}) {
  return (
    <div className="container position-relative">
      <h1 className="main__title text-center">Room occupancy</h1>
      <h2 className="main__subtitle text-center">The optimal guests accommodation</h2>
      <div className={clsx({"content-loading": loading})} role="main">
        <RoomsWrapper />
        <div className="room__content">
          <GuestsWrapper />
          <TotalsWrapper />
        </div>
      </div>
    </div>
  );
}

export default App;
