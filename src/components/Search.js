import React, { Component } from "react";
import M from "materialize-css";
import Slide1 from "../img/slide-1.jpg";

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const marginTop = { marginTop: "30px" };

class Search extends Component {
  componentDidMount() {
    var options = { data: { Test: null } };
    var elems = document.querySelectorAll(".autocomplete");
    var instances = M.Autocomplete.init(elems, options);
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col s12 l12" style={headerStyle}>
            <h3>Find the perfect home to buy or rent</h3>
          </div>
        </div>
        <div className="row justify-content-between">
          <div className="input-field col l9 s12 m9">
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
          <div className="col s6 l1 m1" style={marginTop}>
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              ForRent
            </button>
          </div>
          <div className="col s6 l1 md1" style={marginTop}>
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Sale
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;

// style={{ backgroundImage: `url(${Slide1})` }}
