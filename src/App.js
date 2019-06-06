import React, { Component } from "react";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Search from "./components/Search";
import LatestProperties from "./components/LatestProperties";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Home />
        <Search />
        <LatestProperties />
        <Footer />
      </>
    );
  }
}

export default App;
