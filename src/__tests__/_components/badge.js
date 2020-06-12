import React from "react";
import { render } from "@testing-library/react";
import { GUESTS_TYPES } from "../../_core/consts";
import { Badge } from "../../_components/Badge";

test("render badge", () => {
  const type = GUESTS_TYPES.premiumDisabled;
  const { getByRole } = render(
    <Badge type={type} value={40} />
  );

  const component = getByRole("listitem");
  expect(component).toHaveTextContent("40");
  expect(component).toHaveClass("badge");
  expect(component).toHaveClass("badge");
  expect(component).toHaveClass("badge-premium");
  expect(component).toHaveClass("badge-disabled");
});
