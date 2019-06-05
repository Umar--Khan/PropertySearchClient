import React, { Component } from "react";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import LatestProperties from "./components/LatestProperties";

import "./App.css";

// Bootstrap CSS File
import "./lib/bootstrap/css/bootstrap.min.css";

// Libraries CSS Files
import "./lib/font-awesome/css/font-awesome.min.css";
import "./lib/animate/animate.min.css";
import "./lib/ionicons/css/ionicons.min.css";
import "./lib/owlcarousel/assets/owl.carousel.min.css";

// Main Stylesheet File
import "./css/style.css";

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Home />
        <LatestProperties />
      </>
    );
  }
}

export default App;
