import React, { Component } from "react";
// Normalizes string as a slug - a string that is safe to use
// in both URLs and html attributes
import slugify from "slugify";
import "./App.css";
// import LaptopContainer from './laptopcontainer'
// import Header from './header'

// This object will allow us to
// easily convert numbers into US dollar values
const USCurrencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

// to laptopcontainer
class App extends Component {
  state = {
    selected: {
      //default values for the lists
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
    // to customizelist
    //makes an array out of the the store keys (processor, op system, etc) and then maps through it using the feature and index as arguments
    const features = Object.keys(this.props.features).map((feature, idx) => {
      //creates a new variable with syntax "processor-0"
      const featureHash = feature + "-" + idx;
      //creates a new variable called options that maps through the feature's object (i.e. mapping through the processor object)
      const options = this.props.features[feature].map(item => {
        //creates a new variable called itemhash that takes the features from each component and adds - in place of spaces
        const itemHash = slugify(JSON.stringify(item));
        //creates the radio buttons with itemHash as a key and id -
        return (
          <div key={itemHash} className="feature__item">
            <input
              type="radio"
              id={itemHash}
              className="feature__option"
              name={slugify(feature)}
              // sets checked if item.name (ubuntu etc) is equal to what's in the state (default values basically)
              checked={item.name === this.state.selected[feature].name}
              //this is where the action is - when you change from one radio button to another, grab the event and use the updatefeature function with feature (i.e. processor) as the first input and item (entire object with name and cost)
              onChange={e => this.updateFeature(feature, item)}
            />
            <label htmlFor={itemHash} className="feature__label">
              {item.name} ({USCurrencyFormat.format(item.cost)})
            </label>
          </div>
        );
      });
      //this creates the title for each of the components (i.e. processor) - no longer mapping through options, just mapping through features still
      return (
        <fieldset className="feature" key={featureHash}>
          <legend className="feature__name">
            {/* feature is the argument used for the .map which is the key in the main FEATURES object (i.e. processor) */}
            <h3>{feature}</h3>
          </legend>
          {/* "options" is the variable that holds the radio buttons */}
          {options}
        </fieldset>
      );
    });

    //to cartlist
    //creates a variable called summary that maps through an array of the selected item keys (i.e. processor, etc)
    const summary = Object.keys(this.state.selected).map((feature, idx) => {
      //creates keys and ids using the feature name and the index processor-0
      const featureHash = feature + "-" + idx;
      //creates a variable that stores an object with name and cost
      const selectedOption = this.state.selected[feature];
      //creates the list of components and their options from the state which has the currently selected items only
      return (
        <div className="summary__option" key={featureHash}>
          <div className="summary__option__label">{feature} </div>
          {/* shows the selected option's name (i.e. Bodhi Linux) */}
          <div className="summary__option__value">{selectedOption.name}</div>
          {/* shows the selected options currency translated into us dollars */}
          <div className="summary__option__cost">
            {USCurrencyFormat.format(selectedOption.cost)}
          </div>
        </div>
      );
    });

    //this creates a variable that takes an array of the component names (processor, etc) and loops through each applying the function to each from left to right and coming up with one value at the end
    const total = Object.keys(this.state.selected).reduce(
      //reduce method takes parameters for the function based on specifics - first is the running total (acc) and the current value (curr), which, because we are using Object.keys, works out to be the name of the component
      (acc, curr) => acc + this.state.selected[curr].cost,
      0
    );

    //this is the first return outside of a variable - creates the whole page pretty much - should probably go into app
    return (
      <div className="App">
        {/* to header */}
        <header>
          <h1>ELF Computing | Laptops</h1>
        </header>
        <main>
          {/* to customizeList */}
          <form className="main__form">
            <h2>Customize your laptop</h2>
            {features}
          </form>
          {/* to cartlist */}
          <section className="main__summary">
            <h2>Your cart</h2>
            {summary}
            <div className="summary__total">
              <div className="summary__total__label">Total</div>
              <div className="summary__total__value">
                {USCurrencyFormat.format(total)}
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
