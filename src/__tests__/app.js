import React from "react";
import { render, wait } from "@testing-library/react";
import App from "../app/App";
import { AppProvider } from "../app/AppContext";

jest.mock("../_core/guestsPricesServise");

function renderApp() {
  const { getByText, getByRole, rerender } = render(
    <AppProvider>
      <App />
    </AppProvider>
  );
  return {
    getByText,
    getByRole,
    rerender,
  };
}

test("render headings in App", async () => {
  const { getByText } = renderApp();
  await wait(() => {
    expect(getByText(/room occupancy/i)).toBeInTheDocument();
    expect(getByText(/the optimal guests accommodation/i)).toBeInTheDocument();
  });
});

test("check loading", async () => {
  const roleValue = "main";
  const loadingCssClassName = "content-loading";
  const { getByRole, rerender } = renderApp();
  expect(getByRole(roleValue)).not.toHaveClass(loadingCssClassName);
  rerender(
    <AppProvider>
      <App loading={true} />
    </AppProvider>
  );
  expect(getByRole(roleValue)).toHaveClass(loadingCssClassName);
});
