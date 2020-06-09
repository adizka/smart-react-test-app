import React from "react";
import {render} from '@testing-library/react';
import App from "../app/App";

function renderApp() {
  const {getByText, getByRole, rerender} = render(<App />);
  return {
    getByText,
    getByRole,
    rerender
  };
}

test("render headings in App", () => {
  const {getByText} = renderApp();
  expect(getByText(/room occupancy/i)).toBeInTheDocument();
  expect(getByText(/the optimal guests accommodation/i)).toBeInTheDocument();
});

test("check loading", () => {
  const roleValue = "main";
  const loadingCssClassName = "content-loading";
  const {getByRole, rerender} = renderApp();
  expect(getByRole(roleValue)).not.toHaveClass(loadingCssClassName);
  rerender(<App loading={true} />);
  expect(getByRole(roleValue)).toHaveClass(loadingCssClassName);
});
