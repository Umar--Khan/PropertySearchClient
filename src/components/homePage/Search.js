import React, { Component } from "react";
import { Link } from "react-router-dom";
import Autocomplete from "react-google-autocomplete";

import { connect } from "react-redux";
import { saveSearchTerm } from "../../actions/searchActions";

class Search extends Component {
  state = {
    searchTerm: ""
  };

  handleOnClick = e => {
    const searchTerm = this.state.searchTerm;

    if (searchTerm) {
      this.props.saveSearchTerm(searchTerm);
    }
  };

  handleGoogleSearchTerm = search => {
    this.setState({ searchTerm: search.formatted_address });
  };

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
            <Autocomplete
              style={{ width: "90%" }}
              onPlaceSelected={place => {
                this.handleGoogleSearchTerm(place);
              }}
              types={["(regions)"]}
              componentRestrictions={{ country: "gb" }}
            />
            {/* <label htmlFor="autocomplete-input">
              e.g. 'York', 'NW3 5TY' or 'Waterloo Station'
            </label> */}
          </div>
          <div className="col l6 m6 s6">
            <Link to={"/property-for-rent/search"}>
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
            <Link to={"/property-for-sale/search"}>
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
