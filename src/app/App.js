import React from 'react';
import clsx from "clsx";

function App({loading = true}) {
  return (
    <div className="container position-relative">
      <h1 className="main__title text-center">Room occupancy</h1>
      <h2 className="main__subtitle text-center">The optimal guests accommodation</h2>

      <div className={clsx({"content-loading": loading})} role="main">
        Content
      </div>
    </div>
  );
}

export default App;
