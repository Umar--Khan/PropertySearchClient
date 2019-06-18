import React, { Component } from "react";
import { connect } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import { adzunaAPIKey, adzunaAPPKey } from "../../apiKeys";
import M from "materialize-css";
// import "./Style.css";

import {
  saveApiData,
  saveSearchTerm,
  errorPage,
  updatePageNumber,
  updateMaxResultsNumber
} from "../../actions/searchActions";

class SearchBar extends Component {
  state = {
    where: this.props.searchTerm,
    distance: "0.1",
    price_min: 25000,
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

    if (!this.state.where) {
      this.props.errorPage("No Search Term");
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pageNumber !== this.props.pageNumber) {
      this.runFetchApi();
    }
    if (prevProps.maxResultsNumber !== this.props.maxResultsNumber) {
      if (this.props.maxResultsNumber) {
        this.runFetchApi();
      }
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

  handleGoogleSearchTerm = search => {
    this.setState({ where: search.formatted_address });
    this.props.saveSearchTerm(search.formatted_address);
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
    if (!this.state.where) {
      this.props.errorPage("No Search Term");
      this.props.saveApiData("");
      return;
    }

    this.props.errorPage("Loading");

    let endpoint = `https://cors-anywhere.herokuapp.com/https://api.adzuna.com:443/v1/api/property/gb/search/${
      this.props.pageNumber
    }?app_id=${adzunaAPPKey}&app_key=${adzunaAPIKey}&results_per_page=${
      this.props.maxResultsNumber
    }&what_exclude=land&${this.runQueries()}&category=for-sale`;

    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    };

    fetch(endpoint, {
      headers: headers
    })
      .then(res => res.json())
      .then(data => {
        console.log(endpoint);
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

  handleMaxNumberChange = e => {
    let { value } = e.target;
    if (value > 50) {
      value = 50;
    } else if (value < 1) {
      value = 1;
    }
    this.props.updateMaxResultsNumber(value);
  };

  render() {
    return (
      <div className="container " style={{ marginTop: "50px" }}>
        <div className="row">
          <div
            className="input-field col l6 m6 s12"
            style={{ marginBottom: "0", marginTop: "28px" }}
          >
            <i className="material-icons prefix" onClick={this.runFetchApi}>
              search
            </i>
            <Autocomplete
              style={{ width: "90%", marginTop: "-2rem" }}
              name="where"
              onPlaceSelected={place => {
                this.handleGoogleSearchTerm(place);
                this.props.errorPage("");
                this.runFetchApi();
              }}
              defaultValue={this.props.searchTerm}
              types={["(regions)"]}
              componentRestrictions={{ country: "gb" }}
            />
          </div>
          <div className="input-field col s4 l3 m3">
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
          <div className="input-field col s4 l3 m3">
            <select
              onChange={this.handleSelectChange}
              name="price_max"
              value={this.state.price_max}
            >
              <option value="">Max Price</option>
              {this.createPriceOptions()}
            </select>
          </div>
          <div className="input-field col s4 l3 m3">
            <select
              onChange={this.handleSelectChange}
              name="price_min"
              value={this.state.price_min}
            >
              <option value="">Min Price</option>
              {this.createPriceOptions()}
            </select>
          </div>
          <div className="input-field col s4 l3 m3">
            <select
              onChange={this.handleSelectChange}
              name="beds"
              value={this.state.beds}
            >
              <option value="">Min Beds</option>
              {this.createBedOptions()}
            </select>
          </div>
          <div className="input-field col s4 l3 m3">
            <select
              onChange={this.handleSelectChange}
              name="property_type"
              value={this.state.property_type}
            >
              <option value="">Property Type</option>
              {this.createPropertyTypeOptions()}
            </select>
          </div>
          <div className="input-field col s4 l3 m3">
            <i className="material-icons prefix">find_in_page</i>
            <input
              id="results_per_page"
              type="number"
              className="validate center"
              min="1"
              onChange={this.handleMaxNumberChange}
              max="50"
              value={this.props.maxResultsNumber}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchTerm: state.search.searchTerm,
  pageNumber: state.search.pageNumber,
  maxResultsNumber: state.search.maxResultsNumber,
  error: state.search.error
});

export default connect(
  mapStateToProps,
  {
    saveApiData,
    saveSearchTerm,
    errorPage,
    updatePageNumber,
    updateMaxResultsNumber
  }
)(SearchBar);
