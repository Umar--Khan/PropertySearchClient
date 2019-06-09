import React, { Component } from "react";

import SearchBar from "./sellListingsPage/SearchBar";
import PropertyListings from "./sellListingsPage/PropertyListings";

class Listings extends Component {
  render() {
    return (
      <>
        <SearchBar />
        <PropertyListings />
      </>
    );
  }
}

export default Listings;
