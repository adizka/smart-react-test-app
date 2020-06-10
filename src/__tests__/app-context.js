import React from "react";
import user from "@testing-library/user-event";
import { render, wait } from "@testing-library/react";
import { AppProvider } from "../app/AppContext";
import { RoomsWrapper } from "../app/Rooms/RoomsWrapper";
import { TotalsWrapper } from "../app/Totals/TotalsWrapper";
import { GuestsWrapper } from "../app/Guests/GuestsWrapper";

beforeEach(() => {
  jest.setTimeout(10000);
});

function renderAppWithContext() {
  const { getByLabelText, getByTitle, getAllByRole } = render(
    <AppProvider>
      <RoomsWrapper />
      <GuestsWrapper />
      <TotalsWrapper />
    </AppProvider>
  );
  return {
    getByLabelText,
    getByTitle,
    getAllByRole,
  };
}

test("app context consumers checks", async () => {
  const { getByLabelText, getByTitle, getAllByRole } = renderAppWithContext();
  // inputs
  const economyRoomsCountInput = getByLabelText(
    /available economy rooms count:/i
  );
  const premiumRoomsInput = getByLabelText(/available premium rooms count:/i);

  // Check => 1, 7 => 2 disabled and  8 available badges
  user.type(economyRoomsCountInput, "1");
  user.type(premiumRoomsInput, "7");

  await wait(() => {
    expect(getByTitle(/economy rooms total price/i)).toHaveTextContent("€ 45");
    expect(getByTitle(/premium rooms total price/i)).toHaveTextContent(
      "€ 1153"
    );
    expect(getByTitle(/all rooms total price/i)).toHaveTextContent("€ 1198");

    const setOfBadges = getAllByRole("listitem");
    const disabledRoomsCount = setOfBadges.filter((badge) =>
      badge.classList.contains("badge-disabled")
    ).length;
    expect(disabledRoomsCount).toEqual(2);
    const availableRoomsCount = setOfBadges.filter(
      (badge) => !badge.classList.contains("badge-disabled")
    ).length;
    expect(availableRoomsCount).toEqual(8);
  });

  // Check => 7, 2 => 4 disabled and 6 available
  user.type(economyRoomsCountInput, "7");
  user.type(premiumRoomsInput, "2");

  await wait(() => {
    expect(getByTitle(/economy rooms total price/i)).toHaveTextContent("€ 189");
    expect(getByTitle(/premium rooms total price/i)).toHaveTextContent("€ 583");
    expect(getByTitle(/all rooms total price/i)).toHaveTextContent("€ 772");

    const setOfBadges = getAllByRole("listitem");
    const disabledRoomsCount = setOfBadges.filter((badge) =>
      badge.classList.contains("badge-disabled")
    ).length;
    expect(disabledRoomsCount).toEqual(4);
    const availableRoomsCount = setOfBadges.filter(
      (badge) => !badge.classList.contains("badge-disabled")
    ).length;
    expect(availableRoomsCount).toEqual(6);
  });
});
