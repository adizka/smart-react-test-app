import React from "react";
import {render} from '@testing-library/react';
import App from "../app/App";

function renderApp() {
  const {getByText, getByTitle, rerender} = render(<App />);
  return {
    getByText,
    getByTitle,
    rerender
  }
}

test("render headings in App", () => {
  const {getByText} = renderApp();
  expect(getByText(/room occupancy/i)).toBeInTheDocument();
  expect(getByText(/the optimal guests accommodation/i)).toBeInTheDocument();
});

test("check loading", () => {
  const roleValue = "content";
  const loadingCssClassName = "content-loading";
  const {getByTitle, rerender} = renderApp();
  expect(getByTitle(roleValue)).toHaveClass(loadingCssClassName);
  rerender(<App loading={false} />);
  expect(getByTitle(roleValue)).not.toHaveClass(loadingCssClassName);
});
