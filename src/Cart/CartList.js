import React, { Component } from "react";
import "./CartList.css";

class CartList extends Component {
  render() {
    //creates a variable called summary that maps through an array of the selected item keys (i.e. processor, etc)
    const summary = Object.keys(this.props.selected).map((feature, idx) => {
      //creates keys and ids using the feature name and the index processor-0
      const featureHash = feature + "-" + idx;
      //creates a variable that stores an object with name and cost
      const selectedOption = this.props.selected[feature];
      //creates the list of components and their options from the state which has the currently selected items only
      return (
        <div className="summary__option" key={featureHash}>
          <div className="summary__option__label">{feature} </div>
          {/* shows the selected option's name (i.e. Bodhi Linux) */}
          <div className="summary__option__value">{selectedOption.name}</div>
          {/* shows the selected options currency translated into us dollars */}
          <div className="summary__option__cost">
            {this.props.USCurrencyFormat.format(selectedOption.cost)}
          </div>
        </div>
      );
    });

    //this creates a variable that takes an array of the component names (processor, etc) and loops through each applying the function to each from left to right and coming up with one value at the end
    const total = Object.keys(this.props.selected).reduce(
      //reduce method takes parameters for the function based on specifics - first is the running total (acc) and the current value (curr), which, because we are using Object.keys, works out to be the name of the component
      (acc, curr) => acc + this.props.selected[curr].cost,
      0
    );

    return (
      <section className="main__summary">
        <h2>Your cart</h2>
        {summary}
        <div className="summary__total">
          <div className="summary__total__label">Total</div>
          <div className="summary__total__value">
            {this.props.USCurrencyFormat.format(total)}
          </div>
        </div>
      </section>
    );
  }
}

export default CartList;
