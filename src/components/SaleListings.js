import React, { Component } from "react";

import SearchBar from "./saleListingsPage/SearchBar";
import PropertyListings from "./saleListingsPage/PropertyListings";
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
