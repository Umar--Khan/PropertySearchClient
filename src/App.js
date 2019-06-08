import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import RentListings from "./components/RentListings";
import SellListings from "./components/SellListings";

import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/property-to-rent/search"
            component={RentListings}
          />
          <Route
            exact
            path="/property-to-sell/search"
            component={SellListings}
          />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default App;
