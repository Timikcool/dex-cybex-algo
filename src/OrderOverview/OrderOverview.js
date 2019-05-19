import React, { Component } from "react";
import { sellAlgoOrder, buyAlgoOrder, fetchMarkets } from "../services/cybex";

import "./OrderOverview.scss";
import ReactDropdown from "react-dropdown";

class OrderOverview extends Component {
  constructor(props) {
    super(props);
    const { amount, price, user } = props;
    this.state = {
      assetPair: "ARENA.ETH/ARENA.USDT",
      amount,
      price,
      markets: [],
      total: props.amount * props.price
    };
    document.title = document.title + ` | ${user.username}`;
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleAlgoOrder(type) {
    switch (type) {
      case "sell":
        sellAlgoOrder(
          this.state.assetPair,
          this.state.amount,
          this.state.price,
          10,
          this.props.user,
          this.props.onLogout
        );

      case "buy":
        buyAlgoOrder(
          this.state.assetPair,
          this.state.amount,
          this.state.price,
          10,
          this.props.user,
          this.props.onLogout
        );
      default:
    }
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    const { amount, price, total } = this.state;
    const newState = { [name]: parseFloat(value) };
    if (name === "price") {
      newState.total = value * amount;
    }
    if (name === "total") {
      newState.price = amount / total;
    }
    if (name === "amount") {
      newState.total = value * price;
    }

    this.setState({ ...this.state, ...newState });
  }

  async componentDidMount() {
    //const orderBook = await getOrderBook("ETH/USDT");
    const markets = await fetchMarkets();
    // this.setState({ markets: [{ name: 'ETH/BNC' }, { name: 'LTC/NGR' }] });
    this.setState({ markets });
    // console.log(markets);
  }

  render() {
    const { price, amount, total, markets } = this.state;

    return (
      <div className="order-input-wrapper">
        <div className="order-input">
          <h1> Buy and Sell</h1>
          <button onClick={() => this.props.onLogout()}> Logout</button>
          <div className="input-wrapper">
            {markets && (
              <ReactDropdown
                onChange={({ value }) => this.setState({ assetPair: value })}
                options={markets.map(({ name }) => name)}
                value={this.state.assetPair}
                placeholder="Select trade pair"
              />
            )}
            {/* <span> Price </span> */}
          </div>
          <div className="input-wrapper">
            <input
              type="number"
              name="price"
              value={price}
              placeholder="Price"
              onChange={this.handleInputChange}
            />
          </div>
          <br />
          <div className="input-wrapper">
            {/* <span> Amount </span> */}
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={amount}
              onChange={this.handleInputChange}
            />
          </div>

          <br />

          <div className="input-wrapper">
            {/* <span> Total </span> */}
            <input
              type="number"
              name="total"
              value={total}
              placeholder="Total"
              onChange={this.handleInputChange}
            />
          </div>

          <br />

          <div className="actions">
            <button
              className="buy-btn"
              onClick={() => this.handleAlgoOrder("buy")}
            >
              Buy
            </button>
            <button
              className="sell-btn"
              onClick={() => this.handleAlgoOrder("sell")}
            >
              Sell
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderOverview;
