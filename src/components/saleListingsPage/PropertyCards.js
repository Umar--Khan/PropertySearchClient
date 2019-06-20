import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import M from "materialize-css";
import _ from "lodash";

import { saveCurrentUser } from "../../actions/userActions";
import { saveSingleProperty } from "../../actions/propertyActions";

class PropertyCards extends Component {
  state = {
    clicked: this.isFavourite()
  };

  numberWithCommas = x => {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return (x = 3000);
    }
  };

  getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

  favoriteProperty = (property, e) => {
    e.preventDefault();

    if (!this.props.currentUser) {
      M.toast({ html: "Log in to favorite" });
      return;
    }

    const apiUrl = "http://localhost:3001/api";
    const token = localStorage.getItem("token");

    const userId = this.props.currentUser._id;

    if (token) {
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
        .then(
          data => this.props.saveCurrentUser(data.user),
          M.toast(
            { html: "Added to Favourites" },
            this.setState({ clicked: true })
          )
        )
        .then(this.getUser())
        .catch(err => console.log(err));
    }
  };

  unFavoriteProperty = (property, e) => {
    e.preventDefault();
    const apiUrl = "http://localhost:3001/api";
    const token = localStorage.getItem("token");

    const userId = this.props.currentUser._id;

    if (token) {
      return fetch(apiUrl + `/${userId}/favorite`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({ property: property })
      })
        .then(resp => resp.json())
        .then(
          data => console.log(data),
          M.toast(
            { html: "Removed from Favourites" },
            this.setState({ clicked: false })
          )
        )
        .then(this.getUser())
        .catch(err => console.log(err));
    }
  };

  isFavourite() {
    if (this.props.currentUser) {
      return this.props.currentUser.properties.some(
        property => property.id === this.props.result.id
      );
    }
  }

  clickedIfFavourite = () => {
    if (this.isFavourite()) {
      this.setState({ clicked: true });
    }
  };

  render() {
    const { result, match } = this.props;

    return (
      <div>
        <div className="col l12 s12 m12" key={result.id}>
          <div className="card horizontal card small card-panel hoverable">
            <div className="card-image">
              <Link
                to={
                  match.url === "/property-for-rent/search"
                    ? `/property-for-rent/search/${result.id}`
                    : `/property-for-sale/search/${result.id}`
                }
              >
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
                  {result.beds} bedroom {_.lowerCase(result.property_type)}{" "}
                  {_.lowerCase(result.category.label)}
                </h5>
                <h6 style={semiBoldText}>{result.location.display_name}</h6>
                <p>
                  {_.truncate(result.description, {
                    length: 175
                  })}
                </p>
              </div>
              <div className="card-action">
                <div className="col s4">
                  <Link
                    to={`/property-for-sale/search/${result.id}`}
                    onClick={() => {
                      this.props.saveSingleProperty(result);
                    }}
                  >
                    View More Info
                  </Link>
                </div>
                <div className="col s8">
                  <p style={{ float: "right" }}>
                    Added by {result.agent.display_name}
                  </p>
                </div>
              </div>
            </div>
            <div className="valign-wrapper">
              {result.sale_price ? (
                <h4>£{this.numberWithCommas(result.sale_price)}</h4>
              ) : (
                <h4>£{this.numberWithCommas(result.price_per_month)} pcm</h4>
              )}

              {this.state.clicked ? (
                <a
                  className="btn-floating btn-large light-blue"
                  onClick={e => this.unFavoriteProperty(result, e)}
                  href="#"
                  style={{ marginLeft: "3rem" }}
                >
                  <i className="material-icons">delete</i>
                </a>
              ) : (
                <a
                  className="btn-floating btn-large teal"
                  onClick={e => this.favoriteProperty(result, e)}
                  href="#"
                  style={{ marginLeft: "3rem" }}
                >
                  <i className="material-icons">favorite_border</i>
                </a>
              )}
            </div>
          </div>
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
  currentUser: state.user.currentUser
});

export default connect(
  mapStateToProps,
  { saveCurrentUser, saveSingleProperty }
)(PropertyCards);
