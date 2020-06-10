import React from "react";
import { render } from "@testing-library/react";
import App from "../app/App";
import { AppProvider } from "../app/AppContext";

function renderApp() {
  const { getByText, getByRole, rerender } = render(
    <AppProvider>
      <App loading={true} />
    </AppProvider>
  );
  return {
    getByText,
    getByRole,
    rerender,
  };
}

test("render headings in App", () => {
  const { getByText } = renderApp();
  expect(getByText(/room occupancy/i)).toBeInTheDocument();
  expect(getByText(/the optimal guests accommodation/i)).toBeInTheDocument();
});

test("check loading", () => {
  const roleValue = "main";
  const loadingCssClassName = "content-loading";
  const { getByRole, rerender } = renderApp();
  expect(getByRole(roleValue)).toHaveClass(loadingCssClassName);
  rerender(
    <AppProvider>
      <App loading={false} />
    </AppProvider>
  );
  expect(getByRole(roleValue)).not.toHaveClass(loadingCssClassName);
});
