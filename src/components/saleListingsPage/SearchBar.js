import React, { Component } from "react";
import { connect } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import { adzunaAPIKey, adzunaAPPKey } from "../../apiKeys";
import M from "materialize-css";
import { saveCurrentUser } from "../../actions/userActions";

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
    property_type: "",
    sort_direction: "",
    max_days_old: "",
    sort_by: ""
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

  handleGoogleSearchTerm = search => {
    this.setState({ where: search.formatted_address });
    this.props.saveSearchTerm(search.formatted_address);
  };

  makeID = () => {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  };

  getUser = () => {
    const apiUrl = "http://localhost:3001/api";
    const token = localStorage.getItem("token");

    if (token) {
      return fetch(apiUrl + "/user", {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Token ${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.user) {
            this.props.saveCurrentUser(data.user);
          }
        })
        .catch(err => console.log(err));
    }
  };

  saveSearch = e => {
    e.preventDefault();

    if (!this.props.currentUser) {
      M.toast({ html: "Log in to save search" });
      return;
    }
    const apiUrl = "http://localhost:3001/api";
    const token = localStorage.getItem("token");

    const userId = this.props.currentUser._id;

    const search = {
      where: this.props.searchTerm,
      distance: this.state.distance,
      price_min: this.state.price_min,
      price_max: this.state.price_max,
      beds: this.state.beds,
      property_type: this.state.property_type,
      search_type: "for-sale",
      id: this.makeID()
    };

    if (token) {
      return fetch(apiUrl + `/${userId}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({ search: search })
      })
        .then(resp => resp.json())
        .then(
          data => this.props.saveCurrentUser(data.user),
          M.toast(
            { html: "Added to Saved Searches" },
            this.setState({ clicked: true })
          )
        )
        .then(this.getUser())
        .catch(err => console.log(err));
    }
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
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return "3,000";
    }
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
          <div className="input-field col s4 l2 m2">
            <select
              onChange={this.handleSelectChange}
              name="sort_by"
              value={this.state.sort_by}
            >
              <option value="">Sort By</option>,
              <option value="price">Price</option>,
              <option value="date">Date</option>,
            </select>
          </div>
          <div className="input-field col s4 l2 m2">
            <select
              onChange={this.handleSelectChange}
              name="sort_direction"
              value={this.state.sort_direction}
            >
              <option value="down">Ascending</option>,
              <option value="up">Descending</option>,
            </select>
          </div>
          <div className="input-field col s4 l2 m2">
            <select
              onChange={this.handleSelectChange}
              name="max_days_old"
              value={this.state.max_days_old}
            >
              <option value="">Days Old</option>,
              <option value="7">7 Days Old</option>,
              <option value="14">14 Days Old</option>,
              <option value="30">1 Month Old</option>,
            </select>
          </div>
          <div className="col s12 l3 m3">
            <p style={centerIcons} onClick={this.saveSearch}>
              <i className="material-icons">save</i>
              Save This Search
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const centerIcons = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer"
};

const mapStateToProps = state => ({
  searchTerm: state.search.searchTerm,
  pageNumber: state.search.pageNumber,
  maxResultsNumber: state.search.maxResultsNumber,
  error: state.search.error,
  currentUser: state.user.currentUser
});

export default connect(
  mapStateToProps,
  {
    saveApiData,
    saveSearchTerm,
    errorPage,
    updatePageNumber,
    updateMaxResultsNumber,
    saveCurrentUser
  }
)(SearchBar);
