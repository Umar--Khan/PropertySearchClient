import React, { Component } from "react";

import { connect } from "react-redux";

import {
  saveApiData,
  saveSearchTerm,
  errorPage
} from "../../actions/searchActions";

import M from "materialize-css";

class SearchBar extends Component {
  state = {
    where: this.props.searchTerm,
    distance: "0.1",
    price_min: "",
    price_max: "",
    beds: "",
    property_type: ""
  };

  componentDidMount() {
    const elems2 = document.querySelectorAll("select");
    M.FormSelect.init(elems2);

    if (this.state.where) {
      this.runFetchApi();
    }
  }

  handleSelectChange = e => {
    e.preventDefault();

    const { value, name } = e.target;
    this.setState(Object.assign(this.state, { [name]: value }), () =>
      this.runFetchApi()
    );
  };

  handleInputChange = e => {
    e.preventDefault();

    const { value, name } = e.target;

    this.setState({ [name]: value });
  };

  runQueries = () => {
    const arrKeys = Object.keys(this.state);
    const values = arrKeys.map(item => {
      if (this.state[item]) {
        return `${item}=${this.state[item]}`;
      }
    });
    return values.filter(listItem => listItem !== undefined).join("&");
  };

  runFetchApi = () => {
    let endpoint = `https://cors-anywhere.herokuapp.com/https://api.adzuna.com:443/v1/api/property/gb/search/1?app_id=68f473fd&app_key=a43e6d17d722879b5b2b82bca088bd4a&results_per_page=5&${this.runQueries()}&category=for-sale`;

    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    };

    console.log(endpoint);

    fetch(endpoint, {
      headers: headers
    })
      .then(res => res.json())
      .then(data => {
        console.log("Fetched");
        this.props.saveApiData(data);
        if (this.props.errorPage) {
          this.props.errorPage(false);
        }
      })
      .catch(error => {
        console.log(error);
        this.props.errorPage(true);
      });
  };

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  createPriceOptions = () => {
    let options = [];
    let max = 40000;

    for (let i = 100; i <= max; ) {
      options.push(
        <option value={`${i}`} key={i}>
          {`£${this.numberWithCommas(i)}`}
        </option>
      );

      if (i >= 500 && i < 1500) {
        i += 100;
      } else if (i >= 1500 && i < 3000) {
        i += 250;
      } else if (i >= 3000 && i < 7000) {
        i += 500;
      } else if (i >= 7000 && i < 10000) {
        i += 1000;
      } else if (i >= 10000 && i < 20000) {
        i += 2500;
      } else if (i >= 20000 && i < 40000) {
        i += 5000;
      } else {
        i += 50;
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
      <div className="container " style={{ marginTop: "50px" }}>
        <div className="row">
          <div className="input-field col l4 m3 s12">
            <i className="material-icons prefix" onClick={this.runFetchApi}>
              search
            </i>
            <input
              type="text"
              id="autocomplete-input"
              className="autocomplete"
              name="where"
              onChange={this.handleInputChange}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  this.runFetchApi();
                  this.props.saveSearchTerm(e.target.value);
                }
              }}
              defaultValue={this.props.searchTerm}
            />
          </div>
          <div className="input-field col s4 l2 m2">
            <select
              onChange={this.handleSelectChange}
              name="distance"
              defaultValue="0"
            >
              <option value="0">0 Miles</option>
              <option value="0.25">1/4 Mile</option>
              <option value="0.5">1/2 Mile</option>
              <option value="1">1 Mile</option>
              {this.createMileOptions()}
            </select>
          </div>
          <div className="input-field col s4 l2 m2">
            <select
              onChange={this.handleSelectChange}
              name="price_min"
              value={this.state.price_min}
            >
              <option value="">Min Price</option>
              {this.createPriceOptions()}
            </select>
          </div>
          <div className="input-field col s4 l2 m2">
            <select
              onChange={this.handleSelectChange}
              name="price_max"
              value={this.state.price_max}
            >
              <option value="">Max Price</option>
              {this.createPriceOptions()}
            </select>
          </div>
          <div className="input-field col s4 l2 m2">
            <select
              onChange={this.handleSelectChange}
              name="beds"
              value={this.state.beds}
            >
              <option value="">Min Beds</option>
              {this.createBedOptions()}
            </select>
          </div>
          <div className="input-field col s4 l2 m2">
            <select
              onChange={this.handleSelectChange}
              name="property_type"
              value={this.state.property_type}
            >
              <option value="">Property Type</option>
              {this.createPropertyTypeOptions()}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchTerm: state.search.searchTerm
});

export default connect(
  mapStateToProps,
  { saveApiData, saveSearchTerm, errorPage }
)(SearchBar);
