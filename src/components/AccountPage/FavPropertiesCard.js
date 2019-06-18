import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { saveCurrentUser } from "../../actions/userActions";
import { saveSingleProperty } from "../../actions/propertyActions";

class FavPropertiesCard extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");

    if (token) {
      this.getUser();
    }
  }

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

  unFavoriteProperty = property => {
    const apiUrl = "http://localhost:3001/api";
    const token = localStorage.getItem("token");

    const userId = this.props.currentUser._id;

    if (token) {
      return (
        fetch(apiUrl + `/${userId}/favorite`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Token ${token}`
          },
          body: JSON.stringify({ property: property })
        })
          .then(resp => resp.json())
          // .then(resp => console.log(resp))
          .then(resp => this.getUser())
          .catch(err => console.log(err))
      );
    }
  };

  render() {
    const prop = this.props.property;
    return (
      <div className="col l12 s12 m12">
        <div className="card horizontal card small card-panel hoverable">
          <div className="card-image">
            <Link
              to={
                prop.sale_price
                  ? `/property-for-sale/search/${prop.id}`
                  : `/property-for-rent/search/${prop.id}`
              }
            >
              <img
                src={prop.image_url}
                alt="thumbnail"
                onClick={() => {
                  this.props.saveSingleProperty(prop);
                }}
              />
            </Link>
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <h5>
                {prop.beds} bedroom {_.lowerCase(prop.property_type)}{" "}
                {_.lowerCase(prop.category.label)}
              </h5>
              <h6 style={semiBoldText}>{prop.location.display_name}</h6>
              <p>
                {_.truncate(prop.description, {
                  length: 175
                })}
              </p>
            </div>
            <div className="card-action">
              <Link
                to={
                  prop.sale_price
                    ? `/property-for-sale/search/${prop.id}`
                    : `/property-for-rent/search/${prop.id}`
                }
                onClick={() => {
                  this.props.saveSingleProperty(prop);
                }}
              >
                View More Info
              </Link>
            </div>
          </div>
          <div className="valign-wrapper">
            <h4>
              {prop.price_per_month
                ? `£${this.numberWithCommas(prop.price_per_month)} pcm`
                : `£${this.numberWithCommas(prop.sale_price)}`}
            </h4>
            <a
              className="btn-floating btn-large scale-transition blue darken-3"
              onClick={() => this.unFavoriteProperty(prop)}
              href="#!"
              style={{ marginLeft: "3rem" }}
            >
              <i className="material-icons">delete</i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const boldText = { fontSize: "1.7rem", fontWeight: "500" };
const semiBoldText = { fontSize: "1.5rem", fontWeight: "400" };

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(
  mapStateToProps,
  { saveCurrentUser, saveSingleProperty }
)(FavPropertiesCard);
