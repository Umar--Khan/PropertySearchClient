import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { saveSearchTerm } from "../../actions/searchActions";

import M from "materialize-css";

class Search extends Component {
  state = {
    searchTerm: ""
  };

  handleSearchTerm = e => {
    this.setState({ searchTerm: e.target.value });
  };

  handleOnClick = e => {
    const searchTerm = this.state.searchTerm;

    if (searchTerm) {
      this.props.saveSearchTerm(searchTerm);
    }
  };

  componentDidMount() {
    // const options = {
    //   data: { Test: null }
    // };
    const elems = document.querySelectorAll(".autocomplete");
    return M.Autocomplete.init(elems);
  }

  render() {
    return (
      <div className="container" style={{ marginBottom: "40px" }}>
        <div className="row justify-content-center">
          <div className="col s12 l12">
            <h3 className="center">Find the perfect home to rent or buy</h3>
          </div>
        </div>
        <div className="row">
          <div className="input-field col l12 m9 s12">
            <i className="material-icons prefix">search</i>
            <input
              type="text"
              id="autocomplete-input"
              className="autocomplete"
              onChange={this.handleSearchTerm}
            />
            <label htmlFor="autocomplete-input">
              e.g. 'York', 'NW3 5TY' or 'Waterloo Station'
            </label>
          </div>
          <div className="col l6 m6 s6">
            <Link to={"/property-to-rent/search"}>
              <button
                className="waves-effect waves-light btn-large"
                type="submit"
                name="forRent"
                onClick={this.handleOnClick}
                style={{ width: "100%" }}
              >
                For Rent
              </button>
            </Link>
          </div>
          <div className="col l6 m6 s6">
            <Link to={"/property-to-sell/search"}>
              <button
                className="waves-effect waves-light btn-large"
                type="submit"
                name="forSale"
                onClick={this.handleOnClick}
                style={{ width: "100%" }}
              >
                For Sale
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

// style={{ backgroundImage: `url(${Slide1})` }}

export default connect(
  null,
  { saveSearchTerm }
)(Search);
