import React from "react";
import CartList from "./Cart/CartList";
import CustomizeList from "./Customize/CustomizeList";

class LaptopContainer extends React.Component {
  state = {
    selected: {
      Processor: {
        name: "17th Generation Intel Core HB (7 Core with donut spare)",
        cost: 700
      },
      "Operating System": {
        name: "Ubuntu Linux 16.04",
        cost: 200
      },
      "Video Card": {
        name: "Toyota Corolla 1.5v",
        cost: 1150.98
      },
      Display: {
        name: '15.6" UHD (3840 x 2160) 60Hz Bright Lights and Knobs',
        cost: 1500
      }
    }
  };

  USCurrencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  // to laptopcontainer - updates the state when you select a new "feature" (radio button) - this is our callback props
  updateFeature = (feature, newValue) => {
    //object.assign used to copy values from one object to another - first input is the target, then the source, which in this case is an object with all 4 of the option objects in it
    const selected = Object.assign({}, this.state.selected);
    //takes for example "processor" (as argument feature) and sets the value to the other argument (newValue)
    selected[feature] = newValue;
    //sets the state to selected, which just replaces the current object in the exact same format
    this.setState({
      selected
    });
  };

  render() {
    return (
      <>
        <CustomizeList
          features={this.props.features}
          selected={this.state.selected}
          onUpdateFeature={this.updateFeature}
          USCurrencyFormat={this.USCurrencyFormat}
        />
        <CartList
          selected={this.state.selected}
          USCurrencyFormat={this.USCurrencyFormat}
        />
      </>
    );
  }
}

export default LaptopContainer;
