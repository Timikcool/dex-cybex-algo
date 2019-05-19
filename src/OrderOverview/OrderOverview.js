import React, { Component } from "react"
import ReactDropdown from "react-dropdown"
import Modal from "react-modal"
import { Line, Circle } from "rc-progress"
import { sellAlgoOrder, buyAlgoOrder, fetchMarkets } from "../services/cybex"

import "./OrderOverview.scss"

class OrderOverview extends Component {
  constructor(props) {
    super(props)
    const { amount, price, user } = props
    this.state = {
      assetPair: "ARENA.ETH/ARENA.USDT",
      amount,
      price,
      markets: [],
      total: props.amount * props.price,
      isSendingTx: false,
      numChunks: 10,
      txSent: 0,
      numMaxOpenOrders: 5,
      toleratedPriceDifference: 10,
    };
    document.title = document.title + ` | ${user.username}`;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.OnTxIsSent = this.OnTxIsSent.bind(this);
  }

  OnTxIsSent() {
    this.setState({ txSent: this.state.txSent + 1 }, () => {
      if (this.state.txSent == this.state.numChunks) {
        this.setState({
          assetPair: "ARENA.ETH/ARENA.USDT",
          amount: '',
          price: '',
          markets: [],
          total: '',
          isSendingTx: false,
          numChunks: 10,
          txSent: 0,
          numMaxOpenOrders: 1
        })
      }
    });

  };
  handleAlgoOrder(type) {
    const { assetPair, amount, price, numChunks, numMaxOpenOrders, toleratedPriceDifference } = this.state;
    const { user, onLogout } = this.props;
    this.openModal();
    switch (type) {
      case "sell":
        sellAlgoOrder(
          assetPair,
          amount,
          price,
          numChunks,
          user,
          this.OnTxIsSent,
          onLogout,
          numMaxOpenOrders,
          toleratedPriceDifference,

        );
        break;

      case "buy":
        buyAlgoOrder(
          assetPair,
          amount,
          price,
          numChunks,
          user,
          this.OnTxIsSent,
          onLogout,
          numMaxOpenOrders,
          toleratedPriceDifference,
        );
        break;

      default:
    }
  }
  openModal() {
    this.setState({ isSendingTx: true })
  }

  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   this.subtitle.style.color = "#f00";
  // }

  closeModal() {
    this.setState({ isSendingTx: false })
  }

  handleInputChange(e) {
    const { name, value } = e.target
    const { amount, price, total } = this.state
    const newState = { [name]: parseFloat(value) }
    if (name === "price") {
      newState.total = value * amount
    }
    if (name === "total") {
      newState.price = amount / total
    }
    if (name === "amount") {
      newState.total = value * price
    }

    this.setState({ ...this.state, ...newState })
  }

  async componentDidMount() {
    //const orderBook = await getOrderBook("ETH/USDT");
    const markets = await fetchMarkets()
    // this.setState({ markets: [{ name: 'ETH/BNC' }, { name: 'LTC/NGR' }] });
    this.setState({ markets })
    // console.log(markets);
  }

  render() {
    const customModalStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        width: '45%',
        transform: "translate(-50%, -50%)",
        background: '#212939',
        display: 'flex',
        border: 'none',
        flexDirection: 'column'
      },
    }
    const {
      price,
      amount,
      total,
      markets,
      isSendingTx,
      txSent,
      numChunks,
      numMaxOpenOrders,
      assetPair,
    } = this.state

    return (
      <div className="order-input-wrapper">
        <div className="order-input">
          <button
            className="logout-button"
            onClick={() => this.props.onLogout()}
          >
            Logout
          </button>
          <br />
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
            {
              <ReactDropdown
                onChange={({ value }) => {
                  this.setState({ numChunks: value })
                  console.log("Changes numChunks to ", this.state.numChunks)
                }}
                options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                placeholder="Select number of chunks"
                value={this.state.numChunks.toString()}
              />
            }
            {/* <span> Price </span> */}
          </div>

          <div className="input-wrapper">
            <input
              type="number"
              name="numMaxOpenOrders"
              value={numMaxOpenOrders}
              placeholder="Max Open Orders"
              onChange={this.handleInputChange}
            />
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
              disabled={!(amount && price)}
              onClick={() => this.handleAlgoOrder("buy")}
            >
              Buy
            </button>
            <button
              className="sell-btn"
              disabled={!(amount && price)}
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
          <Line
            percent={(txSent / numChunks) * 100}
            strokeWidth="2"
            trailWidth="2"
            trailColor="black"
            strokeColor="#ff9143"
          />
        </Modal>
      </div>
    )
  }
}

export default OrderOverview
