import React, { Component } from "react";

import { connect } from "react-redux";

import M from "materialize-css";

class SearchBar extends Component {
  state = {
    dropdownTerm: "1 mile",
    minPrice: "Min Price",
    maxPrice: "Max Price"
  };

  componentDidMount() {
    const options = { constrainWidth: false };
    const elems = document.querySelectorAll(".dropdown-trigger");
    return M.Dropdown.init(elems, options);
  }

  changeDropdown = e => {
    this.setState({ [e.target.name]: e.target.innerText });
  };

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  createMinPriceDrop = name => {
    let li = [];
    let max = 20000000;

    for (let i = 50000; i <= max; ) {
      li.push(
        <li key={i}>
          <a href="#!" name={`${name}`}>
            {`£${this.numberWithCommas(i)}`}
          </a>
        </li>
      );

      if (i >= 300000 && i < 500000) {
        i += 25000;
      } else if (i >= 500000 && i < 700000) {
        i += 50000;
      } else if (i >= 700000 && i < 1000000) {
        i += 100000;
      } else if (i >= 1000000 && i < 2000000) {
        i += 250000;
      } else if (i >= 2000000 && i < 3000000) {
        i += 500000;
      } else if (i >= 3000000 && i < 5000000) {
        i += 1000000;
      } else if (i >= 5000000 && i < 10000000) {
        i += 2500000;
      } else if (i >= 10000000 && i < 20000000) {
        i += 5000000;
      } else {
        i += 10000;
      }
    }
    return li;
  };

  createUlDropList = (id, name) => {
    let ul = [];
    let formatName = "";

    if (name === "maxPrice") {
      formatName = "Max Price";
    } else if (name === "minPrice") {
      formatName = "Min Price";
    }

    ul.push(
      <ul
        id={`dropdown${id}`}
        className="dropdown-content"
        onClick={this.changeDropdown}
      >
        <li>
          <a href="#!" name={name}>
            {formatName}
          </a>
        </li>
        {this.createMinPriceDrop(name)}
        <li>
          <a href="#!" name={name}>
            {formatName}
          </a>
        </li>
      </ul>
    );
  };

  render() {
    return (
      <>
        <div
          className="container "
          style={{ minHeight: "50rem", marginTop: "50px" }}
        >
          <div className="row">
            <div className="input-field col l6 m3 s12">
              <i className="material-icons prefix">search</i>
              <input
                type="text"
                id="autocomplete-input"
                className="autocomplete"
                defaultValue={this.props.searchTerm}
              />
            </div>
            <div>
              <a
                className="dropdown-trigger btn"
                href="#"
                data-target="dropdown1"
              >
                {this.state.dropdownTerm}
                <i className="material-icons right">arrow_drop_down</i>
              </a>
              <ul
                id="dropdown1"
                className="dropdown-content"
                onClick={this.changeDropdown}
              >
                <li>
                  <a href="#!" name="dropdownTerm">
                    1/4 Mile
                  </a>
                </li>
                <li>
                  <a href="#!" name="dropdownTerm">
                    1/2 Mile
                  </a>
                </li>
                <li>
                  <a href="#!" name="dropdownTerm">
                    1 Mile
                  </a>
                </li>
                <li>
                  <a href="#!" name="dropdownTerm">
                    2 Miles
                  </a>
                </li>
                <li>
                  <a href="#!" name="dropdownTerm">
                    3 Miles
                  </a>
                </li>
                <li>
                  <a href="#!" name="dropdownTerm">
                    5 Miles
                  </a>
                </li>
                <li>
                  <a href="#!" name="dropdownTerm">
                    10 Miles
                  </a>
                </li>
                <li>
                  <a href="#!" name="dropdownTerm">
                    10+ Miles
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <a
                className="dropdown-trigger btn"
                href="#"
                data-target="dropdown2"
              >
                {this.state.minPrice}
                <i className="material-icons right">arrow_drop_down</i>
              </a>
              <ul
                id="dropdown2"
                className="dropdown-content"
                onClick={this.changeDropdown}
              >
                <li>
                  <a href="#!" name="minPrice">
                    Min Price
                  </a>
                </li>
                {this.createMinPriceDrop("minPrice")}
                <li>
                  <a href="#!" name="minPrice">
                    Min Price
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <a
                className="dropdown-trigger btn"
                href="#"
                data-target="dropdown3"
              >
                {this.state.maxPrice}
                <i className="material-icons right">arrow_drop_down</i>
              </a>
              <ul
                id="dropdown3"
                className="dropdown-content"
                onClick={this.changeDropdown}
              >
                <li>
                  <a href="#!" name="maxPrice">
                    Max Price
                  </a>
                </li>
                {this.createMinPriceDrop("maxPrice")}
                <li>
                  <a href="#!" name="maxPrice">
                    Max Price
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
