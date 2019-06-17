import React, { Component } from "react";

import M from "materialize-css";

import { connect } from "react-redux";

import { saveCurrentUser } from "../../actions/userActions";
import FavPropertiesCard from "./FavPropertiesCard";

class FavPropertiesList extends Component {
  componentDidMount() {
    const el = document.querySelectorAll(".tabs");
    M.Tabs.init(el);

    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate() {
    const el = document.querySelectorAll(".tabs");
    M.Tabs.init(el);
  }

  render() {
    const { properties, searches } = this.props.currentUser;
    return (
      <div
        className="container"
        style={{ minHeight: "57rem", marginTop: "3rem" }}
      >
        {this.props.currentUser && (
          <div className="row">
            <div className="col s12">
              <ul className="tabs">
                <li className="tab col s4">
                  <a className="active" href="#test1">
                    Saved Properties ({properties.length})
                  </a>
                </li>
                <li className="tab col s4">
                  <a href="#test2">Saved Searches ({searches.length})</a>
                </li>
                <li className="tab col s4">
                  <a href="#test3">My Details</a>
                </li>
              </ul>
            </div>
            <div id="test1" className="col s12">
              <div className="row">
                {properties.map(prop => (
                  <FavPropertiesCard key={prop.id} property={prop} />
                ))}
                {properties.length === 0 && (
                  <div className="col s12">
                    <h1 className="center-align" style={{ marginTop: "25rem" }}>
                      You have no saved properties
                    </h1>
                  </div>
                )}
              </div>
            </div>
            <div id="test2" className="col s12">
              {properties.length === 0 && (
                <div className="col s12">
                  <h1 className="center-align" style={{ marginTop: "25rem" }}>
                    You have no saved searches
                  </h1>
                </div>
              )}
            </div>
            <div id="test3" className="col s12">
              <div>
                <h1>{this.props.currentUser.email}</h1>
              </div>
            </div>
          </div>
        )}
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
)(FavPropertiesList);
