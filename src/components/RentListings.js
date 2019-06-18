import React, { Component } from "react";

import SearchBar from "./rentListingsPage/SearchBar";
import PropertyListings from "./saleListingsPage/PropertyListings";
import Pagination from "./saleListingsPage/Pagination";

class Listings extends Component {
  render() {
    return (
      <>
        <SearchBar />
        <PropertyListings {...this.props} />
        <Pagination />
      </>
    );
  }
}

export default Listings;
