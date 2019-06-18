import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import M from "materialize-css";

import ErrorPage from "../saleListingsPage/ErrorPage";

import { saveCurrentUser } from "../../actions/userActions";
import { saveSingleProperty } from "../../actions/propertyActions";

class PropertyListings extends Component {
  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  favoriteProperty = (property, e) => {
    e.preventDefault();

    if (!this.props.currentUser) {
      M.toast({ html: "Log in to favorite" });
      return;
    }

    e.target.parentElement.remove();
    const apiUrl = "http://localhost:3001/api";
    const token = localStorage.getItem("token");

    const userId = this.props.currentUser._id;

    if (token) {
      e.target.parentElement.remove();
      return fetch(apiUrl + `/${userId}/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({ property: property })
      })
        .then(resp => resp.json())
        .then(data => this.props.saveCurrentUser(data.user))
        .catch(err => console.log(err));
    }
  };

  generateRent = () => {
    let min = 1500;
    let max = 2500;
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  render() {
    if (this.props.error || !this.props.data.results) {
      return <ErrorPage />;
    }

    const { results, count } = this.props.data;

    const max = Math.ceil(
      parseInt(count) / parseInt(this.props.maxResultsNumber)
    );

    return (
      <div className="container" style={{ minHeight: "35rem" }}>
        <div className="divider" />
        <div className="row center-align" style={{ marginTop: "3rem" }}>
          <div className="col l12 s12 m12">
            <div className="col l4 m4 s4">
              <h6>Properties For Rent in {this.props.searchTerm}</h6>
            </div>
            <div className="col l4 m4 s4">
              <h5>{count}</h5>
              <h6>Results</h6>
            </div>
            <div className="col l4 m4 s4">
              <h6>
                {count >= 1 ? (
                  <span>
                    Page {this.props.pageNumber} of {max}
                  </span>
                ) : (
                  <> </>
                )}
              </h6>
            </div>
          </div>
        </div>
        <div className="divider" style={{ marginBottom: "3rem" }} />
        <div className="row">
          {results.map(
            result =>
              result.price_per_month && (
                <div className="col l12 s12 m12" key={result.id}>
                  <div className="card horizontal card small card-panel hoverable">
                    <div className="card-image">
                      <Link to={`/property-for-rent/search/${result.id}`}>
                        <img
                          src={result.image_url}
                          alt="thumbnail"
                          onClick={() => {
                            this.props.saveSingleProperty(result);
                          }}
                        />
                      </Link>
                    </div>
                    <div className="card-stacked">
                      <div className="card-content">
                        <h5>
                          {result.beds ? `${result.beds} bedroom ` : "Studio "}
                          {_.lowerCase(result.property_type)}{" "}
                          {_.lowerCase(result.category.label)}
                        </h5>
                        <h6 style={semiBoldText}>
                          {result.location.display_name}
                        </h6>
                        <p>
                          {_.truncate(result.description, {
                            length: 175
                          })}
                        </p>
                      </div>
                      <div className="card-action">
                        <Link
                          to={`/property-for-rent/search/${result.id}`}
                          onClick={() => {
                            this.props.saveSingleProperty(result);
                          }}
                        >
                          View More Info
                        </Link>
                      </div>
                    </div>
                    <div className="valign-wrapper">
                      <h4>
                        £{this.numberWithCommas(result.price_per_month)} pcm
                      </h4>
                      <a
                        className="btn-floating red"
                        onClick={e => this.favoriteProperty(result, e)}
                        href="#"
                        style={{ marginLeft: "3rem" }}
                      >
                        <i className="material-icons">favorite_border</i>
                      </a>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    );
  }
}

const boldText = { fontSize: "1.7rem", fontWeight: "500" };
const semiBoldText = { fontSize: "1.5rem", fontWeight: "400" };

const mapStateToProps = state => ({
  data: state.search.data,
  searchTerm: state.search.searchTerm,
  error: state.search.error,
  currentUser: state.user.currentUser,
  pageNumber: state.search.pageNumber,
  maxResultsNumber: state.search.maxResultsNumber
});

export default connect(
  mapStateToProps,
  { saveCurrentUser, saveSingleProperty }
)(PropertyListings);
