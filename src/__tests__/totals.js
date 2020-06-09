import React from "react";
import { render } from "@testing-library/react";
import { Totals } from "../app/Totals/Totals";

function renderTotals(economyTotal = 0, premiumTotal = 0) {
  const { getByTitle } = render(
    <Totals economyTotal={economyTotal} premiumTotal={premiumTotal} />
  );
  return {
    getByTitle,
  };
}

test("renders Totals", () => {
  const { getByTitle } = renderTotals(189, 1054);
  expect(getByTitle(/economy rooms total price/i)).toHaveTextContent("€ 189");
  expect(getByTitle(/premium rooms total price/i)).toHaveTextContent("€ 1054");
  expect(getByTitle(/all rooms total price/i)).toHaveTextContent("€ 1243");
});
