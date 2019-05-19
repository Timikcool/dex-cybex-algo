import Cybex from "romejs";
import dotenv from "dotenv";
import { doWhileStatement } from "@babel/types";

// dotenv.config();

export const fetchMarkets = async () => {
  const cybex = new Cybex();
  const markets = await cybex.fetchMarkets();
  return markets;
};

export const getOrderBook = async () => {
  const assetPair = "ETH/USDT";
  const cybex = new Cybex();

  const orderbook = await cybex.fetchOrderBook(assetPair, 1);
  console.log(orderbook);

  const olhcv = await cybex.fetchOHLCV(assetPair);
  console.log(olhcv);

  const balance = await cybex.fetchBalance(process.env.accountName);
  console.log(balance);

  const pubTrades = await cybex.fetchTrades(assetPair, true, 5);
  console.log(pubTrades);

  await cybex.setSigner({
    accountName: process.env.accountName,
    password: process.env.password
  });
  const res = await cybex.createMarketBuyOrder(assetPair, 0.001);
  console.log(res);
};

export const sellAlgoOrder = async (
  assetPair,
  amount,
  price,
  numChunks,
  user,
  callback,
  logout,
  numMaxOpenOrders,
  toleratedPriceDifference,
) => {
  const cybex = new Cybex();
  console.log("sellAlgoOrder");
  cybex
    .setSigner({ accountName: user.username, password: user.password })
    .then(async data => {
      for (var i = 0; i < numChunks;) {
        if (await shouldGenerateNewPosition(assetPair, numMaxOpenOrders, user, price * (1 - toleratedPriceDifference), 10)) {
          const res = await cybex.createLimitSellOrder(
            assetPair,
            amount / numChunks,
            price
          );
          console.log(res);
          if (!res) {
            i--;
          } else {
            callback();
          }
          i++
        }
      }
    })
    .catch(err => {
      console.log("ERROR signing:", err);
      if (err.message === "You need to provide credentials for signing") {
        logout();
      }
    });
};

export const buyAlgoOrder = async (
  assetPair,
  amount,
  price,
  numChunks,
  user,
  callback,
  logout,
  numMaxOpenOrders,
  toleratedPriceDifference,
) => {
  const cybex = new Cybex();
  console.log("buyAlgoOrder");
  cybex
    .setSigner({ accountName: user.username, password: user.password })
    .then(async data => {
      for (var i = 0; i < numChunks;) {
        if ( await shouldGenerateNewPosition(assetPair, numMaxOpenOrders, user, price * (1 + toleratedPriceDifference), 10)) {
          const res = await cybex.createLimitBuyOrder(
            assetPair,
            amount / numChunks,
            price
          );
          if (!res) {
            i--;
          } else {
            callback();
          }
          i++
        }
      }
    })
    .catch(err => {
      console.log("ERROR signing:", err);
      if (err.message === "You need to provide credentials for signing") {
        console.log(err.message);
        logout();
      }
    });
};



export const shouldGenerateNewPosition = async (assetPair, numMaxOpenOrders, user, limitPrice, toleratedPriceDifference) => {
  const cybex = new Cybex();

  toleratedPriceDifference = 10
  // numMaxOpenOrders = 5

  const res = await cybex.setSigner({
    accountName: user.username,
    password: user.password
  });

  // check maximum number of open orders
  var numOpenOrders = await getNumberOpenOrders(assetPair, user)
  if (numOpenOrders == -1 || numOpenOrders > numMaxOpenOrders) {
    console.log("Stop generating new orders, current open orders" + numOpenOrders)
    return false
  }

  // check if current price is still a good deal
  // check if give price is still good
  var currentPrice = await cybex.fetchBestPrice(assetPair)

  var bigger = limitPrice
  var smaller = currentPrice
  if (bigger < smaller) {
    var tmp = bigger
    bigger = smaller
    smaller = tmp
  }

  if ((bigger - smaller) / bigger > toleratedPriceDifference) {
    return false
  }

  return true

}

const getNumberOpenOrders = async function (assetPair, user) {
  const cybex = new Cybex();

  const res = await cybex.setSigner({
    accountName: user.username,
    password: user.password
  });

  // check maximum number of open orders
  try {
    var num = await cybex.fetchOpenOrders(assetPair, user.username);
    console.log("Num of open orders:", num)

    return num.length

  } catch (err) {
    console.log("error queying number of open orders:", err)
    return -1
  }
}
