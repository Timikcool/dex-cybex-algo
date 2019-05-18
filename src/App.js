import React from 'react';
import logo from './logo.svg';
import { getOrderBook, fetchMarkets } from './services/cybex';

import './App.css';
import Login from './login';

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

  async componentDidMount() {
    //const orderBook = await getOrderBook("ETH/USDT");
    // const markets = await fetchMarkets();
    // this.setState({ markets });
  }

  render() {
    const { isAuthorized, data } = this.state;
    return <>{!isAuthorized ? <Login /> : <div className="app" />}</>;
  }
}

export default App;
