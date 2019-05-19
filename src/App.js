import React from "react";
import logo from "./logo.svg";
import { getOrderBook, fetchMarkets } from "./services/cybex";
import OrderOverview from "./OrderOverview";
import "./App.css";
import Login from "./login";
import Cybex from "romejs";

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

  auth = async (username, password) => {
    try {
      const cybex = new Cybex();
      await cybex.setSigner({ accountName: username, password: password });

      this.setState({
        user: {
          username,
          password
        },
        isAuthorized: true
      });
    } catch (err) {
      console.log(err);
    }
    console.log(username, password);
  };

  logout = () => {
    this.setState({ isAuthorized: false });
  };

  async componentDidMount() {
    //const orderBook = await getOrderBook("ETH/USDT");
    // const markets = await fetchMarkets();
    // this.setState({ markets });
  }

  render() {
    const { isAuthorized, data, markets, user } = this.state;
    console.log(data);
    return (
      <>
        {!isAuthorized ? (
          <Login authCallback={this.auth} />
        ) : (
          <OrderOverview
            price={162}
            amount={2}
            user={user}
            onLogout={this.logout}
          />
        )}
      </>
    );
  }
}

export default App;
