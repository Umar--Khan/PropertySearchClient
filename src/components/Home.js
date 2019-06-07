import React, { Component } from "react";

import Search from "./homePage/Search";
import LatestProperties from "./homePage/LatestProperties";
import OurServices from "./homePage/OurServices";

class Home extends Component {
  render() {
    return (
      <>
        <Search />
        <LatestProperties />
        <OurServices />
      </>
    );
  }
}

export default Home;
