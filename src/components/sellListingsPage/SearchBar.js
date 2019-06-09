import React, { Component } from "react";

import { connect } from "react-redux";

import { saveApiData } from "../../actions/searchActions";

import M from "materialize-css";

class SearchBar extends Component {
  state = {
    searchTerm: this.props.searchTerm,
    mileRadius: "1",
    minPrice: "",
    maxPrice: "",
    minBeds: "",
    maxBeds: "",
    propertyType: ""
  };

  componentDidMount() {
    const elems2 = document.querySelectorAll("select");
    M.FormSelect.init(elems2);

    if (this.state.searchTerm) {
      this.runFetchApi();
    }
  }

  handleSelectChange = e => {
    e.preventDefault();
    const { value, name } = e.target;

    this.setState({ [name]: value }, () => this.runFetchApi());
  };

  runFetchApi = () => {
    const endpoint = `https://api.adzuna.com:443/v1/api/property/gb/search/1?app_id=68f473fd&app_key=a43e6d17d722879b5b2b82bca088bd4a&results_per_page=5&where=${
      this.state.searchTerm
    }&category=for-sale`;

    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        this.props.saveApiData(data);
      });
  };

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  createPriceOptions = () => {
    let options = [];
    let max = 20000000;

    for (let i = 50000; i <= max; ) {
      options.push(
        <option value={`${i}`} key={i}>
          {`£${this.numberWithCommas(i)}`}
        </option>
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
    return options;
  };

  createMileOptions = () => {
    let options = [];

    const arr = [3, 5, 10, 15, 20, 30, 40];

    for (let i = 0; i < arr.length; i++) {
      options.push(
        <option value={`${arr[i]}`} key={i}>
          {`${arr[i]} Miles`}
        </option>
      );
    }
    return options;
  };

  createBedOptions = () => {
    let options = [];

    for (let i = 1; i <= 10; i++) {
      options.push(<option value={`${i}`} key={i}>{`${i} Bed`}</option>);
    }

    return options;
  };

  createPropertyTypeOptions = () => {
    let options = [];
    options.push(
      <option value="house_detached" key="1">
        Detached
      </option>,
      <option value="house_semi" key="2">
        Semi-detached
      </option>,
      <option value="house_terraced" key="3">
        Terraced
      </option>,
      <option value="flat" key="4">
        Flat
      </option>,
      <option value="house_bungalow" key="5">
        Bungalow
      </option>
    );
    return options;
  };

  render() {
    return (
      <>
        <div className="container " style={{ marginTop: "50px" }}>
          <div className="row">
            <div className="input-field col l2 m3 s12">
              <i className="material-icons prefix">search</i>
              <input
                type="text"
                id="autocomplete-input"
                className="autocomplete"
                name="searchTerm"
                onChange={this.handleSelectChange}
                defaultValue={this.props.searchTerm}
              />
            </div>
            <div className="input-field col s4 l2 m2">
              <select
                onChange={this.handleSelectChange}
                name="mileRadius"
                defaultValue="1"
              >
                <option value="0.25">1/4 Mile</option>
                <option value="0.5">1/2 Mile</option>
                <option value="1">1 Mile</option>
                {this.createMileOptions()}
              </select>
            </div>
            <div className="input-field col s4 l2 m2">
              <select
                onChange={this.handleSelectChange}
                name="minPrice"
                value={this.state.maxPrice}
              >
                <option value="">Min Price</option>
                {this.createPriceOptions()}
              </select>
            </div>
            <div className="input-field col s4 l2 m2">
              <select
                onChange={this.handleSelectChange}
                name="maxPrice"
                value={this.state.maxPrice}
              >
                <option value="">Max Price</option>
                {this.createPriceOptions()}
              </select>
            </div>
            <div className="input-field col s4 l2 m2">
              <select
                onChange={this.handleSelectChange}
                name="minBeds"
                value={this.state.minBeds}
              >
                <option value="">Min Beds</option>
                {this.createBedOptions()}
              </select>
            </div>
            <div className="input-field col s4 l2 m2">
              <select
                onChange={this.handleSelectChange}
                name="maxBeds"
                value={this.state.maxBeds}
              >
                <option value="">Max Beds</option>
                {this.createBedOptions()}
              </select>
            </div>
            <div className="input-field col s4 l2 m2">
              <select
                onChange={this.handleSelectChange}
                name="propertyType"
                value={this.state.propertyType}
              >
                <option value="">Property Type</option>
                {this.createPropertyTypeOptions()}
              </select>
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
  { saveApiData }
)(SearchBar);
