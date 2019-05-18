const Cybex = require("romejs");

// import dotenv from "dotenv";

const dotenv = require('dotenv')

dotenv.config();

startTests = () => {
  const testAccountName = process.env.ACCOUNT_NAME;
  const testPassword = process.env.PASSWORD;

  (async () => {
    const cybex = new Cybex();
    const assetPair = "ARENA.ETH/ARENA.USDT";

    // const orderbook = await cybex.fetchOrderBook(assetPair, 1);
    // console.log(orderbook);

    // const olhcv = await cybex.fetchOHLCV(assetPair);
    // console.log(olhcv);

    // const balance = await cybex.fetchBalance("shanti001");
    // console.log(balance);

    // const pubTrades = await cybex.fetchTrades(assetPair, true, 5);
    // console.log(pubTrades);


    cybex.setSigner({ accountName: testAccountName, password: testPassword }).then(data => {
      console.log(data)
      // const r = await cybex.setSigner({account:"1.2.XXXX", "key":"longprivatekey"});
      const res = cybex.createMarketBuyOrder(assetPair, 0.01);

      console.log(res);
    }).catch(err =>{
      console.log("ERROR signing:", err)
    })


  })();


}

startTests()
