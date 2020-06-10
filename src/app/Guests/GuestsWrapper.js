import React from "react";
import { Guests } from "./Guests";
import { useAppContext } from "../AppContext";

export function GuestsWrapper() {
  const { results } = useAppContext();
  return <Guests accommodation={results.accommodation} />;
}
