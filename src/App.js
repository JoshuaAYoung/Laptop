import React, { Component } from "react";
import "./App.css";
import LaptopContainer from "./LaptopContainer";
import Header from "./Header.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main>
          <LaptopContainer features={this.props.features} />
        </main>
      </div>
    );
  }
}

export default App;
