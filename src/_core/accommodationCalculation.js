import { GUESTS_TYPES } from "./consts";

/**
 * Returns a guest with calculated price and type
 * @param {Array} guestsPrices
 * @param {integer} economyRoomsCount
 * @param {integer} premiumRoomsCount
 * @returns {Object} result - Calculated accommodation
 * @returns {number} result.economyUsage
 * @returns {number} result.economyTotalPrice
 * @returns {number} result.premiumUsage
 * @returns {number} result.premiumTotalPrice
 */
export function calculateOptimalAccommodation(
  guestsPrices = [],
  economyRoomsCount = 0,
  premiumRoomsCount = 0
) {
  // 0, 0
  if (economyRoomsCount === 9 && premiumRoomsCount === 0) {
    return getAccommodationResults({});
  }

  const sortedByDescendingGuestsPrices = guestsPrices.sort((a, b) => b - a);
  // create dictionary
  const accommodation = {};
  Object.values(GUESTS_TYPES).forEach((type) => (accommodation[type] = []));

  const availability = {
    isEnoughEconomy:
      sortedByDescendingGuestsPrices.filter((el) => el < 100).length <=
      economyRoomsCount,
    economyRoomsCount,
    premiumRoomsCount,
  };
  sortedByDescendingGuestsPrices.forEach((el) => {
    const guest = calculateGuestTypeWithPriceAndStatus(el, availability);
    accommodation[guest.type].push(guest);
  });
  return getAccommodationResults(accommodation);
}

/**
 * Returns total price from guests list
 * @param  {Object} accommodation
 * example of accommodation: {
 *       econom: [
 *         { type: 'econom', price: 99 },
 *         { type: 'econom', price: 45 },
 *         { type: 'econom', price: 23 }
 *       ],
 *       premium: [
 *         { type: 'premium', price: 374 },
 *         { type: 'premium', price: 209 },
 *         { type: 'premium', price: 155 }
 *       ],
 *       'econom-disabled': [ { type: 'econom-disabled', price: 22 } ],
 *       'premium-disabled': [
 *         { type: 'premium-disabled', price: 115 },
 *         { type: 'premium-disabled', price: 101 },
 *         { type: 'premium-disabled', price: 100 }
 *       ],
 *       ecopremium: []
 *     }
 * @returns {object} result
 * @returns {number} result.economyUsage.
 * @returns {number} result.economyTotalPrice
 * @returns {number} result.premiumUsage.
 * @returns {number} result.premiumTotalPrice
 */
function getAccommodationResults(accommodation) {
  return {
    economyUsage: accommodation[GUESTS_TYPES.economy].length,
    economyTotalPrice: getTotalPrice(accommodation[GUESTS_TYPES.economy]),
    premiumUsage:
      accommodation[GUESTS_TYPES.premium].length +
      accommodation[GUESTS_TYPES.economInPremium].length,
    premiumTotalPrice:
      getTotalPrice(accommodation[GUESTS_TYPES.premium]) +
      getTotalPrice(accommodation[GUESTS_TYPES.economInPremium]),
  };
}

/**
 * Returns a guest with calculated price and type
 * @param  {number} guestPrice
 *         Guest price
 * @param  {Object} availability
 *         isEnoughEconomy: boolean
 *         Rooms availability of the economyRoomsCount: number and premiumRoomsCount: number
 *         !!! Availability object properties can be changed during function execution
 * @returns {Object} result - Calculated guest
 * @returns {string} result.type - from GUESTS_TYPES.
 * @returns {number} result.price - guestPrice
 * example of result: { type: 'premium-disabled', price: 115 }
 */
function calculateGuestTypeWithPriceAndStatus(
  guestPrice = 0,
  availability = {
    isEnoughEconomy: true,
    economyRoomsCount: 0,
    premiumRoomsCount: 0,
  }
) {
  // The guest is 'premium' and premium room is available
  if (guestPrice > 99 && availability.premiumRoomsCount) {
    availability.premiumRoomsCount--;
    return {
      type: GUESTS_TYPES.premium,
      price: guestPrice,
    };
  }

  // The guest is 'premium' and premium isn't available
  if (guestPrice > 99 && !availability.premiumRoomsCount) {
    return {
      type: GUESTS_TYPES.premiumDisabled,
      price: guestPrice,
    };
  }

  // The guest is 'economy', economy room isn't available and premium room is available
  if (
    guestPrice < 100 &&
    availability.premiumRoomsCount &&
    !availability.isEnoughEconomy
  ) {
    availability.premiumRoomsCount--;
    return {
      type: GUESTS_TYPES.economInPremium,
      price: guestPrice,
    };
  }

  // The guest is 'economy' and economy room is available
  if (availability.economyRoomsCount) {
    availability.economyRoomsCount--;
    return {
      type: GUESTS_TYPES.economy,
      price: guestPrice,
    };
  }

  // The guest is 'economy', economy room isn't available and premium room isn't available too
  return {
    type: GUESTS_TYPES.economyDisabled,
    price: guestPrice,
  };
}

/**
 * Returns total price from guests list
 * @param  {Array} arr
 *
 * @returns {number} result
 */
function getTotalPrice(arr) {
  const result = arr.reduce((acc, el) => acc + el.price, 0);
  return result;
}
