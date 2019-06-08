import React, { Component } from "react";

import { connect } from "react-redux";

class SearchBar extends Component {
  render() {
    return (
      <>
        <h1>Rent Page</h1>
        <h1>{`${this.props.searchTerm}`}</h1>
      </>
    );
  }
}

const mapStateToProps = state => ({
  searchTerm: state.search.searchTerm
});

export default connect(
  mapStateToProps,
  null
)(SearchBar);
