import React, { Component } from "react";

import { connect } from "react-redux";

class PropertyListings extends Component {
  render() {
    return (
      <div className="container" style={{ minHeight: "25rem" }}>
        <h1>Listings go Here</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.search.data
});

export default connect(
  mapStateToProps,
  null
)(PropertyListings);
