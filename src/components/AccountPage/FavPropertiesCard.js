import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { saveCurrentUser } from "../../actions/userActions";

class FavPropertiesCard extends Component {
  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  unFavoriteProperty = property => {
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
        .then(data => this.props.saveCurrentUser(data.user))
        .catch(err => console.log(err));
    }
  };

  render() {
    const prop = this.props.property;
    return (
      <div className="col l12 s12 m12">
        <div className="card horizontal card small card-panel hoverable">
          <div className="card-image">
            <a
              className="btn-floating halfway-fab waves-effect waves-light red"
              onClick={() => this.unFavoriteProperty(prop)}
              href="#!"
            >
              <i className="material-icons">delete</i>
            </a>
            <img src={prop.image_url} alt="thumbnail" />
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
              <a href="#">View More Info</a>
            </div>
          </div>
          <div className="valign-wrapper">
            <h4>£{this.numberWithCommas(prop.sale_price)}</h4>
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
  { saveCurrentUser }
)(FavPropertiesCard);
