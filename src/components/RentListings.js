import React, { Component } from "react";

import SearchBar from "./rentListingsPage/SearchBar";
import PropertyListings from "./rentListingsPage/PropertyListings";
import Pagination from "./saleListingsPage/Pagination";

class Listings extends Component {
  render() {
    return (
      <>
        <SearchBar />
        <PropertyListings />
        <Pagination />
      </>
    );
  }
}

export default Listings;
