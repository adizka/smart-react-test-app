import { GUESTS_TYPES, MIN_PREMIUM_PRICE } from "./consts";

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

  // create dictionary
  const accommodation = {};
  Object.values(GUESTS_TYPES).forEach((type) => (accommodation[type] = []));
  const sortedByDescendingGuestsPrices = guestsPrices.sort((a, b) => b - a);

  // fill premium and premium-disabled
  const premiumGuestsPrices = sortedByDescendingGuestsPrices.filter(
    (el) => el >= MIN_PREMIUM_PRICE
  );
  premiumGuestsPrices.forEach((price, index) => {
    if (index + 1 <= premiumRoomsCount) {
      const guest = wrapGuest(price, GUESTS_TYPES.premium);
      accommodation[GUESTS_TYPES.premium].push(guest);
      return;
    }

    const guest = wrapGuest(price, GUESTS_TYPES.premiumDisabled);
    accommodation[GUESTS_TYPES.premiumDisabled].push(guest);
  });

  // fill econom, econom-disabled and ecopremium
  const economGuestsPrices = sortedByDescendingGuestsPrices.filter(
    (el) => el < MIN_PREMIUM_PRICE
  );

  // count unAvailable econom
  let unAvailableEconomCounts = economGuestsPrices.length - economyRoomsCount;
  if (unAvailableEconomCounts < 0) {
    unAvailableEconomCounts = 0;
  }

  // count available premium for econom
  let availablePremimCounts = premiumRoomsCount - premiumGuestsPrices.length;
  if (availablePremimCounts < 0) {
    availablePremimCounts = 0;
  }
  if (unAvailableEconomCounts > 0 && availablePremimCounts > 0) {
    availablePremimCounts =
      unAvailableEconomCounts > availablePremimCounts
        ? economyRoomsCount
        : unAvailableEconomCounts;
  }
  if (unAvailableEconomCounts === 0) {
    availablePremimCounts = 0;
  }

  economGuestsPrices.forEach((price, index) => {
    // econom in premium
    if (index + 1 <= availablePremimCounts) {
      const guest = wrapGuest(price, GUESTS_TYPES.economInPremium);
      accommodation[GUESTS_TYPES.economInPremium].push(guest);
      return;
    }

    // econom
    if (index + 1 <= availablePremimCounts + economyRoomsCount) {
      const guest = wrapGuest(price, GUESTS_TYPES.economy);
      accommodation[GUESTS_TYPES.economy].push(guest);
      return;
    }

    // econom-disabled
    const guest = wrapGuest(price, GUESTS_TYPES.economyDisabled);
    accommodation[GUESTS_TYPES.economyDisabled].push(guest);
  });

  return getAccommodationResults(accommodation);
}

/**
 * Returns a guest object
 * @param {integer} price
 * @param {string} type
 * @returns {Object} result - wrapped guest
 * @returns {number} result.price
 * @returns {string} result.type
 */
function wrapGuest(price, type) {
  return { type, price };
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
    accommodation,
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
 * Returns total price from guests list
 * @param  {Array} arr
 *
 * @returns {number} result
 */
function getTotalPrice(arr) {
  const result = arr.reduce((acc, el) => acc + el.price, 0);
  return result;
}
