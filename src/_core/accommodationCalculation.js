import { GUESTS_TYPES, MIN_PREMIUM_PRICE } from "./consts";

/**
 * Returns a guest with calculated price and type
 * @param {Array} guestsPrices
 * @param {integer} economyRoomsCount
 * @param {integer} premiumRoomsCount
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
 * @returns {object} result.accommodation
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
  const {
    premiumAccommodation,
    availablePremiumRooms,
  } = calclulatePremiumAccommodation(guestsPrices, premiumRoomsCount);

  const {
    economyAccommodation,
  } = calclulateEconomAccommodation(guestsPrices, economyRoomsCount, availablePremiumRooms);

  const accommodation = Object.assign(premiumAccommodation, economyAccommodation);
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
  };;
}

function calclulatePremiumAccommodation(guestPrices, premiumRoomsCount) {
  // First we sort guests prices => desc
  // Then filter all prices which are more than 99
  const premiumGuestsPrices = guestPrices
    .sort((a, b) => b - a)
    .filter((el) => el >= MIN_PREMIUM_PRICE);
  let availablePremiumRooms = premiumRoomsCount;

  // init our result as dictinary => key: GuestType | value: [] (array of guests)
  const premiumAccommodation = {};
  premiumAccommodation[GUESTS_TYPES.premium] = [];
  premiumAccommodation[GUESTS_TYPES.premiumDisabled] = [];

  premiumGuestsPrices.forEach((price, index) => {
    availablePremiumRooms--;
    // fill premium guests
    if (index + 1 <= premiumRoomsCount) {
      const guest = wrapGuest(price, GUESTS_TYPES.premium);
      premiumAccommodation[GUESTS_TYPES.premium].push(guest);
      return;
    }

    // fill disabled premium guests
    const guest = wrapGuest(price, GUESTS_TYPES.premiumDisabled);
    premiumAccommodation[GUESTS_TYPES.premiumDisabled].push(guest);
  });

  return {
    premiumAccommodation,
    availablePremiumRooms:
      availablePremiumRooms < 0 ? 0 : availablePremiumRooms,
  };
}

function calclulateEconomAccommodation(
  guestsPrices,
  economyRoomsCount,
  availablePremimCounts
) {
  // init our result as dictinary => key: GuestType | value: [] (array of guests)
  const economyAccommodation = {};
  economyAccommodation[GUESTS_TYPES.economy] = [];
  economyAccommodation[GUESTS_TYPES.economyDisabled] = [];
  economyAccommodation[GUESTS_TYPES.economInPremium] = [];

  // First we sort guests prices => asc
  // Then filter all prices which are less than 100
  const economPrices = guestsPrices
    .sort((a, b) => a - b)
    .filter((el) => el < MIN_PREMIUM_PRICE);

  let availableEconomyRooms = economyRoomsCount;
  let availablePremimRooms = availablePremimCounts;
  let unavalableEconomyRooms = economPrices.length - (availableEconomyRooms + availablePremimRooms);
  if (unavalableEconomyRooms < 0) {
    unavalableEconomyRooms = 0;
  }

  economPrices.forEach((price) => {
    if (unavalableEconomyRooms) {
      // fill economy disabled
      economyAccommodation[GUESTS_TYPES.economyDisabled].push(wrapGuest(price, GUESTS_TYPES.economyDisabled));
      unavalableEconomyRooms--;
      return;
    }

    // fill economy 
    if (availableEconomyRooms) {
      economyAccommodation[GUESTS_TYPES.economy].push(wrapGuest(price, GUESTS_TYPES.economy));
      availableEconomyRooms--;
      return;
    }

    // fill economy in premium
    economyAccommodation[GUESTS_TYPES.economInPremium].push(wrapGuest(price, GUESTS_TYPES.economInPremium));
    availablePremimRooms--;
  });
  
  // if economy rooms is enough
  return { 
    economyAccommodation,
    availableEconomyRooms
  };
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
 * @param  {Array} arr
 *
 * @returns {number} result
 */
function getTotalPrice(arr) {
  const result = arr.reduce((acc, el) => acc + el.price, 0);
  return result;
}
