import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-test-renderer";
import { AppProvider, useAppContext } from "../app/AppContext";
import { GUESTS_TYPES } from "../_core/consts";

beforeEach(() => {
  jest.setTimeout(10000);
});

test("app context hook", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useAppContext(), {
    wrapper: AppProvider,
  });

  // test 0, 0
  expect(result.current.loading).toBe(true);
  expect(result.current.results.economyTotalPrice).toBe(0);
  expect(result.current.results.premiumTotalPrice).toBe(0);
  expect(
    result.current.results.accommodation[GUESTS_TYPES.economy]
  ).toHaveLength(0);
  expect(
    result.current.results.accommodation[GUESTS_TYPES.premium]
  ).toHaveLength(0);
  expect(
    result.current.results.accommodation[GUESTS_TYPES.economInPremium]
  ).toHaveLength(0);
  expect(
    result.current.results.accommodation[GUESTS_TYPES.economyDisabled]
  ).toHaveLength(0);

  // waiting pricing fetch
  await waitForNextUpdate();
  expect(result.current.loading).toBe(false);
  expect(result.current.results.economyTotalPrice).not.toBe(0);
  expect(result.current.results.premiumTotalPrice).not.toBe(0);

  // handle change rooms count
  act(() => {
    result.current.setEconomyRoomsCount(1);
    result.current.setPremiumRoomsCount(7);
  });

  // checking result
  expect(result.current.results.economyTotalPrice).toBe(45);
  expect(result.current.results.premiumTotalPrice).toBe(1153);
  expect(
    result.current.results.accommodation[GUESTS_TYPES.economy]
  ).toHaveLength(1);
  expect(
    result.current.results.accommodation[GUESTS_TYPES.premium]
  ).toHaveLength(6);
  expect(
    result.current.results.accommodation[GUESTS_TYPES.economInPremium]
  ).toHaveLength(1);
  expect(
    result.current.results.accommodation[GUESTS_TYPES.economyDisabled]
  ).toHaveLength(2);
});
