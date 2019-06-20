import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";

import { connect } from "react-redux";

import { saveCurrentUser } from "../../actions/userActions";
import FavPropertiesCard from "./FavPropertiesCard";
import SavedSearchesList from "./SavedSearchesList";

class FavPropertiesList extends Component {
  componentDidMount() {
    const el = document.querySelectorAll(".tabs");
    M.Tabs.init(el);

    const token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate(prevState, prevProps) {
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
                  <a className="active teal-text" href="#test1">
                    Saved Properties ({properties.length})
                  </a>
                </li>
                <li className="tab col s4">
                  <a href="#test2" className="teal-text">
                    Saved Searches ({searches.length})
                  </a>
                </li>
                <li className="tab col s4">
                  <a href="#test3" className="teal-text">
                    My Details
                  </a>
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
                    <h3 className="center-align" style={{ marginTop: "20rem" }}>
                      You have no saved properties
                    </h3>
                    <div className="center">
                      <Link
                        style={{
                          cursor: "pointer",
                          fontSize: "2rem",
                          fontWeight: "400"
                        }}
                        className="teal-text"
                        to={"/property-for-sale/search"}
                      >
                        Want to check out properties?
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div id="test2" className="col s12">
              <div className="row">
                <div className="collection">
                  {searches.map(search => (
                    <SavedSearchesList key={search.id} search={search} />
                  ))}
                </div>
                {searches.length === 0 && (
                  <div className="col s12">
                    <h3 className="center-align" style={{ marginTop: "20rem" }}>
                      You have no saved searches
                    </h3>
                    <div className="center">
                      <Link
                        style={{
                          cursor: "pointer",
                          fontSize: "2rem",
                          fontWeight: "400"
                        }}
                        className="teal-text"
                        to={"/property-for-sale/search"}
                      >
                        Want to check out properties?
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div id="test3" className="col s12">
                <div>
                  <h1>{this.props.currentUser.email}</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const semiBoldText = { fontSize: "1rem", fontWeight: "500" };

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(
  mapStateToProps,
  { saveCurrentUser }
)(FavPropertiesList);
