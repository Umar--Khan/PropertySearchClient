import React, { Component } from "react";
import _ from "lodash";

import M from "materialize-css";

import { connect } from "react-redux";

class FavPropertiesList extends Component {
  componentDidMount() {
    const el = document.querySelectorAll(".tabs");
    M.Tabs.init(el);

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
    } else {
      this.props.history.push("/");
    }
  }

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    const { properties } = this.props.currentUser;

    return (
      <div className="container" style={{ minHeight: "35rem" }}>
        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s4">
                <a className="active" href="#test1">
                  Saved Properties ({properties.length})
                </a>
              </li>
              <li className="tab col s4">
                <a href="#test2">Saved Searches</a>
              </li>
              <li className="tab col s4">
                <a href="#test3">My Details</a>
              </li>
            </ul>
          </div>
          <div id="test1" className="col s12">
            <div className="row">
              {properties.map(result => (
                <React.Fragment key={result.id}>
                  <div className="col l12 s12 m12">
                    <div className="card horizontal card small card-panel hoverable">
                      <div className="card-image">
                        <a
                          className="btn-floating halfway-fab waves-effect waves-light red"
                          onClick={() => this.favoriteProperty(result)}
                          href="#!"
                        >
                          <i className="material-icons">add</i>
                        </a>
                        <img src={result.image_url} alt="thumbnail" />
                      </div>
                      <div className="card-stacked">
                        <div className="card-content">
                          <h5>
                            {result.beds} bedroom{" "}
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
                          <a href="#">View More Info</a>
                        </div>
                      </div>
                      <div className="valign-wrapper">
                        <h4>£{this.numberWithCommas(result.sale_price)}</h4>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div id="test2" className="col s12">
            Test 2
          </div>
          <div id="test3" className="col s12">
            Test 3
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
  null
)(FavPropertiesList);
