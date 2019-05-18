import React, { Component } from "react";

class OrderOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: "",
      amount: "",
      total: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { price, amount, total } = this.state;

    return (
      <div>
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
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={this.handleInputChange}
        />
        <br />
        <input
          type="number"
          name="total"
          value={total}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default OrderOverview;
