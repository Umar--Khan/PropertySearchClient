import React, { Component } from "react";
import { Link } from "react-router-dom";

import M from "materialize-css";

class Search extends Component {
  componentDidMount() {
    const options = { data: { Test: null } };
    const elems = document.querySelectorAll(".autocomplete");
    return M.Autocomplete.init(elems, options);
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
            />
            <label htmlFor="autocomplete-input">
              e.g. 'York', 'NW3 5TY' or 'Waterloo Station'
            </label>
          </div>
          <div className="col l6 m6 s6">
            <Link to={"/search"}>
              <button
                className="waves-effect waves-light btn-large"
                type="submit"
                name="forRent"
              >
                For Rent
              </button>
            </Link>
          </div>
          <div className="col l6 m6 s6">
            <Link to={"/search"}>
              <button
                className="waves-effect waves-light btn-large"
                type="submit"
                name="forSale"
              >
                For Sale
              </button>
            </Link>
          </div>

          {/* <div className="col s6 l1 m1" style={{marginTop: "30px"}}>
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              For Rent
            </button>
          </div>
          <div className="col s6 l1 md1" style={{marginTop: "30px"}}>
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Sale
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Search;

// style={{ backgroundImage: `url(${Slide1})` }}
