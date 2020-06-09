import React from "react";
import user from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { Rooms } from "../app/Rooms/Rooms";

function renderRooms() {
  const { getByLabelText, rerender, getAllByRole } = render(<Rooms />);
  return {
    getByLabelText,
    rerender,
    getAllByRole,
  };
}

test("renders headings", () => {
  const { getAllByRole } = renderRooms(<Rooms />);
  expect(getAllByRole("columnheader")[0]).toHaveTextContent(/economy/i);
  expect(getAllByRole("columnheader")[1]).toHaveTextContent(/premium/i);
});

test("entering economy rooms count", () => {
  const { getByLabelText } = renderRooms(<Rooms />);

  // Check economy rooms count inputs
  const economyRoomsCountInput = getByLabelText(
    /available economy rooms count:/i
  );
  // Check correct => 10
  user.type(economyRoomsCountInput, "10");
  expect(economyRoomsCountInput.value).toEqual("10");
  // Check correct => 0
  user.type(economyRoomsCountInput, "0");
  expect(economyRoomsCountInput.value).toEqual("0");
  // Check incorrect => 'A'
  user.type(economyRoomsCountInput, "A");
  expect(economyRoomsCountInput.value).toEqual("0");

  // Check economy rooms count inputs
  const premiumRoomsInput = getByLabelText(/available premium rooms count:/i);
  // Check correct => 10
  user.type(premiumRoomsInput, "10");
  expect(premiumRoomsInput.value).toEqual("10");
  // Check correct => 0
  user.type(premiumRoomsInput, "0");
  expect(premiumRoomsInput.value).toEqual("0");
  // Check incorrect => 'A'
  user.type(premiumRoomsInput, "A");
  expect(premiumRoomsInput.value).toEqual("0");
});
