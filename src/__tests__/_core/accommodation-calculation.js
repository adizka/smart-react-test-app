import { GUESTS_PRICES } from "../../_core/consts";
import { calculateOptimalAccommodation } from "../../_core/accommodationCalculation";

test.each`
  economyRoomsCount | premiumRoomsCount | economyUsage | economyTotalPrice | premiumUsage | premiumTotalPrice
  ${0}              | ${0}              | ${0}         | ${0}              | ${0}         | ${0}
  ${3}              | ${3}              | ${3}         | ${167}            | ${3}         | ${738}
  ${5}              | ${7}              | ${4}         | ${189}            | ${6}         | ${1054}
  ${7}              | ${2}              | ${4}         | ${189}            | ${2}         | ${583}
  ${1}              | ${7}              | ${1}         | ${45}             | ${7}         | ${1153}
`(
  "calculate optimal accommodation ($economyRoomsCount, $premiumRoomsCount)",
  ({
    economyUsage,
    economyTotalPrice,
    premiumUsage,
    premiumTotalPrice,
    economyRoomsCount,
    premiumRoomsCount,
  }) => {
    expect(
      calculateOptimalAccommodation(
        GUESTS_PRICES,
        economyRoomsCount,
        premiumRoomsCount
      )
    ).toEqual({
      accommodation: expect.any(Object),
      economyUsage,
      economyTotalPrice,
      premiumUsage,
      premiumTotalPrice,
    });
  }
);
