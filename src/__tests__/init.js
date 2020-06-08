import React from "react";
import ReactDOM from "react-dom";
import { screen } from "@testing-library/dom";
import Init from "../Init";

test("start tests", () => {});

test("test that splash screen is disabled after app initialization process", () => {
  // splash screen emulation
  const splashDiv =
    "<div title='splash screen' id='splash' class='show'>Loadiing</div>";
  document.body.innerHTML += splashDiv;

  // root div emulation
  const rootDiv = document.createElement("div");
  document.body.append(rootDiv);

  ReactDOM.render(<Init />, rootDiv);
  const splashScreenDiv = screen.getByTitle(/splash screen/i);
  expect(splashScreenDiv).not.toHaveClass("show");
});
