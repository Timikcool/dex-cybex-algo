import React, { Component } from 'react';
import ReactDropdown from 'react-dropdown';
import Modal from 'react-modal';
import { Line, Circle } from 'rc-progress';
import { sellAlgoOrder, buyAlgoOrder, fetchMarkets } from '../services/cybex';

import './OrderOverview.scss';

class OrderOverview extends Component {
  constructor(props) {
    super(props);
    const { amount, price, user } = props;
    this.state = {
      assetPair: "ARENA.ETH/ARENA.USDT",
      amount,
      price,
      markets: [],
      total: props.amount * props.price,
      isSendingTx: false,
      numChunks: 10,
      txSent: 0
    };
    document.title = document.title + ` | ${user.username}`;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  txIsSent = () => {
    this.setState({txSent: this.state.txSent + 1});
  }
  handleAlgoOrder(type) {
    this.openModal();
    try {
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
    } catch (err) {
      console.log(err);
      this.props.onLogout();
    }
  }
  openModal() {
    this.setState({ isSendingTx: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ isSendingTx: false });
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
    const customModalStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
      }
    };
    const {
      price,
      amount,
      total,
      markets,
      isSendingTx,
      txSent,
      numChunks,
      assetPair
    } = this.state;

    return (
      <div className="order-input-wrapper">
        <div className="order-input">
          <h1> Buy and Sell</h1>
          <div className="input-wrapper">
            {markets && (
              <ReactDropdown
                onChange={({ value }) => this.setState({ assetPair: value })}
                options={markets.map(({ name }) => name)}
                value={assetPair}
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
        <Modal
          isOpen={isSendingTx}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customModalStyles}
          contentLabel="Sending Transactions"
        >
          <div className="counter">{`${txSent} / ${numChunks}`}</div>
          <Circle percent={(txSent / numChunks) * 100} strokeWidth="4" strokeColor="#ff9143" />
        </Modal>
      </div>
    );
  }
}

export default OrderOverview;
