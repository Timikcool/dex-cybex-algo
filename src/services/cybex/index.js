import Cybex from "romejs";
import dotenv from "dotenv";

dotenv.config();

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

  const balance = await cybex.fetchBalance("paul-1");
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
