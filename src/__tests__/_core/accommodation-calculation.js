import { GUESTS_PRICES } from "../../_core/consts";
import { calculateOptimalAccommodation } from "../../_core/accommodationCalculation";

test("calculate optimal accommodation", () => {
  // test 0 => 0, 0
  expect(calculateOptimalAccommodation(GUESTS_PRICES, 0, 0)).toStrictEqual({
    economyUsage: 0,
    economyTotalPrice: 0,
    premiumUsage: 0,
    premiumTotalPrice: 0
  });

  // test 1 => 3, 3
  expect(
    calculateOptimalAccommodation(GUESTS_PRICES, 3, 3)
  ).toStrictEqual({
    economyUsage: 3,
    economyTotalPrice: 167,
    premiumUsage: 3,
    premiumTotalPrice: 738
  });

  // // test 2 => 5, 7
  // expect(
  //   calculateOptimalAccommodation(GUESTS_PRICES, {
  //     economyRoomsCount: 5,
  //     premiumRoomsCount: 7,
  //   })
  // ).toStrictEqual({
  //   economyUsage: 4,
  //   economyTotalPrice: 189,
  //   premiumUsage: 6,
  //   premiumTotalPrice: 1054
  // });

  // // test 3 => 7, 2
  //  expect(
  //   calculateOptimalAccommodation(GUESTS_PRICES, {
  //     economyRoomsCount: 7,
  //     premiumRoomsCount: 2,
  //   })
  // ).toStrictEqual({
  //   economyUsage: 4,
  //   economyTotalPrice: 189,
  //   premiumUsage: 2,
  //   premiumTotalPrice: 583
  // });

  // // test 4 => 1, 7
  // expect(
  //   calculateOptimalAccommodation(GUESTS_PRICES, {
  //     economyRoomsCount: 1,
  //     premiumRoomsCount: 7,
  //   })
  // ).toStrictEqual({
  //   economyUsage: 1,
  //   economyTotalPrice: 45,
  //   premiumUsage: 7,
  //   premiumTotalPrice: 1153
  // });
});
