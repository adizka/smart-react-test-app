import React from "react";
import { render, wait } from "@testing-library/react";
import App from "../app/App";
import { AppProvider } from "../app/AppContext";

jest.mock("../_core/guestsPricesServiсe", () => {
  return {
    fetchData: (callback) => {
      setTimeout(() => {
        callback({});
      }, 1000);
    },
  };
});

test("render headings and loading in App", async () => {
  const { getByText, getByRole } = render(
    <AppProvider>
      <App />
    </AppProvider>
  );

  // headings
  expect(getByText(/room occupancy/i)).toBeInTheDocument();
  expect(getByText(/the optimal guests accommodation/i)).toBeInTheDocument();

  // loading
  const roleValue = "main";
  const loadingCssClassName = "content-loading";
  expect(getByRole(roleValue)).toHaveClass(loadingCssClassName);
  await wait(() => {
    expect(getByRole(roleValue)).not.toHaveClass(loadingCssClassName);
  }, 2000);
});
