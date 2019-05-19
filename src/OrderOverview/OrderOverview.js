import React, { Component } from 'react';
import { sellAlgoOrder, fetchMarkets } from '../services/cybex';

import './OrderOverview.scss';
import ReactDropdown from 'react-dropdown';

class OrderOverview extends Component {
  constructor(props) {
    super(props);
    const { amount, price } = props;
    this.state = {
      assetPair: 'ARENA.ETH/ARENA.USDT',
      amount,
      price,
      markets: [],
      total: props.amount * props.price
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSellAlgoOrder = this.handleSellAlgoOrder.bind(this);
  }

  handleSellAlgoOrder() {
    console.log('Called handleSellAlgoOrder');
    sellAlgoOrder(
      this.state.assetPair,
      this.state.amount,
      this.state.price,
      10,
      this.props.user
    );
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    const { amount, price, total } = this.state;
    const newState = { [name]: value };
    if (name === 'price') {
      newState.total = value * amount;
    }
    if (name === 'total') {
      newState.price = amount / total;
    }
    if (name === 'amount') {
      newState.total = value * price;
    }

    this.setState(newState);
  }

  async componentDidMount() {
    //const orderBook = await getOrderBook("ETH/USDT");
    // const markets = await fetchMarkets();
    this.setState({ markets:[{name:'ETH/BNC'}, {name:'LTC/NGR'}] });
    // console.log(markets);
  }

  render() {
    const { price, amount, total, markets } = this.state;

    return (
      <div className="order-input-wrapper">
        <div className="order-input">
          <h1> Buy and Sell</h1>
          <div className="input-wrapper">
            {markets && (
              <ReactDropdown
                onChange={this._onSelect}
                options={markets.map(({ name }) => name)}
                placeholder="Select trade pair"
              />
            )}
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

          <button>Buy</button>
          <button onClick={this.handleSellAlgoOrder}>Sell</button>
        </div>
      </div>
    );
  }
}

export default OrderOverview;
