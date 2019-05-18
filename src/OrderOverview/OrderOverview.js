import React, { Component } from "react";
import { sellAlgoOrder, buyAlgoOrder } from "../services/cybex";

import "./OrderOverview.css";

class OrderOverview extends Component {
  constructor(props) {
    super(props);
    const { amount, price } = props;
    this.state = {
      assetPair: "ARENA.ETH/ARENA.USDT",
      amount,
      price,
      total: props.amount * props.price
    };

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
          this.props.user
        );
      case "buy":
        buyAlgoOrder(
          this.state.assetPair,
          this.state.amount,
          this.state.price,
          10,
          this.props.user
        );
      default:
    }
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    const { amount, price, total } = this.state;
    const newState = { [name]: value };
    if (name === "price") {
      newState.total = value * amount;
    }
    if (name === "total") {
      newState.price = amount / total;
    }
    if (name === "amount") {
      newState.total = value * price;
    }

    this.setState(newState);
  }

  render() {
    const { price, amount, total } = this.state;

    return (
      <div className="order-input-wrapper">
        <h1> Buy and Sell</h1>
        <div className="input-wrapper">
          <span> Price </span>
          <input
            type="number"
            name="price"
            value={price}
            onChange={this.handleInputChange}
          />
        </div>
        <br />
        <div className="input-wrapper">
          <span> Amount </span>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={this.handleInputChange}
          />
        </div>

        <br />

        <div className="input-wrapper">
          <span> Total </span>
          <input
            type="number"
            name="total"
            value={total}
            onChange={this.handleInputChange}
          />
        </div>

        <br />

        <button onClick={() => this.handleAlgoOrder("buy")}>Buy</button>
        <button onClick={() => this.handleAlgoOrder("sell")}>Sell</button>
      </div>
    );
  }
}

export default OrderOverview;
