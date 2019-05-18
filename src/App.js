import React from "react";
import logo from "./logo.svg";
import { getOrderBook, fetchMarkets } from "./services/cybex";
import OrderOverview from "./OrderOverview";
import "./App.css";
import Login from "./login";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markets: [],
      data: null,
      isAuthorized: false,
      fetching: false
    };
  }

  auth = (username, password) => {
    console.log(username, password);
  }

  async componentDidMount() {
    //const orderBook = await getOrderBook("ETH/USDT");
    // const markets = await fetchMarkets();
    // this.setState({ markets });
  }

  render() {
    const { isAuthorized, data, markets } = this.state;
    console.log(data);
    return (
      <>
        {!isAuthorized ? <Login /> : <OrderOverview price={162} amount={2} />}
      </>
    );
  }
}

export default App;
