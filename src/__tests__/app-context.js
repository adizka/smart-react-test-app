import React from "react";
import user from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { AppProvider } from "../app/AppContext";
import { RoomsWrapper } from "../app/Rooms/RoomsWrapper";
import { TotalsWrapper } from "../app/Totals/TotalsWrapper";

function renderAppWithContext() {
  const { getByLabelText, getByTitle, getAllByRole } = render(
    <AppProvider>
      <RoomsWrapper />
      <TotalsWrapper />
    </AppProvider>
  );
  return {
    getByLabelText,
    getByTitle,
    getAllByRole,
  };
}

test("app context consumers checks", () => {
  const { getByLabelText, getByTitle } = renderAppWithContext();
  // inputs
  const economyRoomsCountInput = getByLabelText(
    /available economy rooms count:/i
  );
  const premiumRoomsInput = getByLabelText(/available premium rooms count:/i);

  // Check => 1, 7
  user.type(economyRoomsCountInput, "1");
  user.type(premiumRoomsInput, "7");
  expect(getByTitle(/economy rooms total price/i)).toHaveTextContent("€ 45");
  expect(getByTitle(/premium rooms total price/i)).toHaveTextContent("€ 1153");
  expect(getByTitle(/all rooms total price/i)).toHaveTextContent("€ 1198");

  // Check => 7, 2
  user.type(economyRoomsCountInput, "7");
  user.type(premiumRoomsInput, "2");
  expect(getByTitle(/economy rooms total price/i)).toHaveTextContent("€ 189");
  expect(getByTitle(/premium rooms total price/i)).toHaveTextContent("€ 583");
  expect(getByTitle(/all rooms total price/i)).toHaveTextContent("€ 772");
});
