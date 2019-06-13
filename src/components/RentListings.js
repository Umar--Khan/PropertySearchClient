import React, { Component } from "react";

import SearchBar from "./rentListingsPage/SearchBar";
import PropertyListings from "./saleListingsPage/PropertyListings";

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
