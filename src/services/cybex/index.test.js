const Cybex = require("romejs");

// import dotenv from "dotenv";

const dotenv = require('dotenv')

dotenv.config();

startTests = () => {
  const testAccountName = process.env.ACCOUNT_NAME;
  const testPassword = process.env.PASSWORD;

  const cybex = new Cybex();
  const assetPair = "ARENA.ETH/ARENA.USDT";

  cybex.setSigner({ accountName: testAccountName, password: testPassword }).then(data => {

    var passed = TestCreateLimitOrder(cybex, assetPair, 6, 11)
    if (!passed) {
      console.log("Failed creating limit order", passed)
    }

    passed = TestFetchPrice(cybex, assetPair)
    if (!passed) {
      console.log("Failed fetching price", assetPair)
    }

    passed = TestGetAsset(cybex, assetPair)
    if (!passed) {
      console.log("Failed getting price of ", assetPair)
    }

  }).catch(err => {
    console.log("ERROR signing:", err)
  })
}

var TestFetchPrice = function (cybex, assetPair) {
  return new Promise(function (resolve, reject) {
    cybex.fetchBestPrice("ETH/USDT").then(bestprice => {
      resolve()
    }).catch(err => {
      console.log("Error getting best price", err)
      reject("error getting price " + assetPair)
    })

  })
}


var TestCreateLimitOrder = async function (cybex, assetPair, amount, price) {
  return new Promise(function (resolve, reject) {
    cybex.createLimitBuyOrder(assetPair, 6, 1234).then(data => {
      resolve("Response for limit buy order" + data)
    }).catch(err => {
      console.log("Error building limit buy order", err)
      reject(false)
    })
  })

}


var TestGetAsset = function (cybex, assetPair) {
  return new Promise(function (resolve, reject) {
    cybex.get_pair(assetPair).then(data => {
      resolve()
    }).catch(err => {
      console.log("Error retriving price for asset", assetPair)
      reject()  
    })
  })

}


var TestShouldSendNewOrder = function (market) {
  var maxNumberOpenOrders = 100
  var startingPrice = 100
  var currentPrice = 90
  var priceChangeTolerancePercentage = 10

  shouldGenerateNewPosition()

}


// startTests()


var testGenerateNewOrders = function() {

}
