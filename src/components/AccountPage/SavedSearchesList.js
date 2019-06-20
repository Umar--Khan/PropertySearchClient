import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { saveSearchTerm } from "../../actions/searchActions";
import { saveCurrentUser } from "../../actions/userActions";

class SavedSearchesList extends Component {
  componentDidMount() {
    const token = localStorage.getItem("token");

    if (token) {
      this.getUser();
    }
  }

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

  removeSearch = search => {
    const apiUrl = "http://localhost:3001/api";
    const token = localStorage.getItem("token");

    const userId = this.props.currentUser._id;

    if (token) {
      return fetch(apiUrl + `/${userId}/search`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({ search: search })
      })
        .then(resp => resp.json())
        .then(resp => this.getUser())
        .catch(err => console.log(err));
    }
  };

  render() {
    const { search } = this.props;

    return (
      <li className="collection-item">
        <div>
          <Link
            className="grey-text text-darken-3"
            style={{ float: "left" }}
            to={
              search.search_type === "for-sale"
                ? "/property-for-sale/search"
                : "/property-for-rent/search"
            }
            onClick={() => this.props.saveSearchTerm(search.where)}
          >
            {search.search_type === "for-sale"
              ? "Properties for sale in"
              : "Properties for rent in"}{" "}
            {search.where}
          </Link>
          <Link
            to={
              search.search_type === "for-sale"
                ? "/property-for-sale/search"
                : "/property-for-rent/search"
            }
            className="secondary-content"
            onClick={() => this.props.saveSearchTerm(search.where)}
          >
            <i className="material-icons">send</i>
          </Link>
          <a
            href="#!"
            className="secondary-content"
            onClick={() => this.removeSearch(search)}
            style={{ marginRight: "4rem" }}
          >
            <i className="material-icons">delete</i>
          </a>
          <p
            className="secondary-content"
            onClick={this.search}
            style={{ marginRight: "4rem", cursor: "pointer", marginTop: "0" }}
          >
            <i className="material-icons">share</i>
          </p>
        </div>
      </li>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(
  mapStateToProps,
  { saveSearchTerm, saveCurrentUser }
)(SavedSearchesList);
