import React from "react";
import { render } from "@testing-library/react";
import { GuestsList } from "../app/Guests/GuestsList";

test("render guests list", () => {
  const title = "Economy";
  const guestsMock = [
    { type: "econom", price: 99 },
    { type: "econom", price: 45 },
    { type: "econom", price: 23 },
  ];

  const { getAllByRole, getByRole, container } = render(
    <GuestsList guests={guestsMock} title={title} />
  );

  // Title checking
  const heading = container.querySelector("h5");
  expect(heading).toHaveTextContent(title);

  // List checking
  const list = getByRole("list");
  expect(list).toBeInTheDocument();
  expect(list).toHaveClass("box");

  // List items checking
  const badges = getAllByRole("listitem");
  guestsMock.forEach((guest, index) => {
    const badge = badges[index];
    expect(badge).toHaveTextContent(`€ ${guest.price}`);
    expect(badge).toHaveClass("badge");
    expect(badge).toHaveClass(`badge-${guest.type}`);
  });
});
