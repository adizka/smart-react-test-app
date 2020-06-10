import { GUESTS_PRICES } from "./consts";

// this is just a fake service to simulate interacting with a server
// simulate the network request time...
const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

async function fetchData(callBack) {
  await sleep(600);
  // response data
  const data = { guestsPrices: GUESTS_PRICES };
  callBack(data);
}

export { fetchData };
