import React, { Component } from "react";
// import "./customizelist.css";
// import LaptopComponent from "./LaptopComponent";
import slugify from "slugify";
import "./CustomizeList.css";

class CustomizeList extends Component {
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
              checked={item.name === this.props.selected[feature].name}
              //this is where the action is - when you change from one radio button to another, grab the event and use the updatefeature function with feature (i.e. processor) as the first input and item (entire object with name and cost)
              onChange={e => this.props.onUpdateFeature(feature, item)}
            />
            <label htmlFor={itemHash} className="feature__label">
              {item.name} ({this.props.USCurrencyFormat.format(item.cost)})
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

    return (
      <form className="main__form">
        <h2>Customize your laptop</h2>
        {features}
      </form>
    );
  }
}

export default CustomizeList;
