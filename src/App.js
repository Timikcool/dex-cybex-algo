import React from "react";
import logo from "./logo.svg";
import { getOrderBook, fetchMarkets } from "./services/cybex";
import OrderOverview from "./OrderOverview";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markets: [],
      data: null
    };
  }

  async componentDidMount() {
    //const orderBook = await getOrderBook("ETH/USDT");
    const markets = await fetchMarkets();
    this.setState({ markets });
  }

  render() {
    const { markets, data } = this.state;
    console.log(data);
    return <OrderOverview price={162} amount={2} tradingPair={"ETH/USTD"} />;
  }
}

export default App;
