// import Cybex from "romejs";
// import dotenv from "dotenv";

const dotenv = require('dotenv')

dotenv.config();

startTests = () => {
  if (process.env.accountName != "igomeza94") {
    console.log("Error for account name, should be igomeza94, was ", process.env.accountName)
  }

}

startTests()
