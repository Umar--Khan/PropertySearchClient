import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Listings from "./components/Listings";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Listings} />
        </Switch>
        <Footer />
      </>
    );
  }
}

export default App;
