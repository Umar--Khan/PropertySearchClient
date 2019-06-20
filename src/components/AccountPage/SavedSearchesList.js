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

    let searchTerm;

    if (this.props.search.searchTerm) {
      let searchTerm = this.props.search.searchTerm;
    }

    if (searchTerm) {
      this.props.saveSearchTerm(searchTerm);
    }

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

  render() {
    const { search } = this.props;
    return (
      <li className="collection-item">
        <div className="center">
          {search.where}
          <Link
            to={`/property-${search.search_type}/`}
            className="secondary-content"
            onClick={this.redirectToSearch}
          >
            <i className="material-icons">send</i>
          </Link>
          <a
            href="#!"
            className="secondary-content"
            onClick={this.removeSearch}
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

export default connect(
  null,
  { saveSearchTerm, saveCurrentUser }
)(SavedSearchesList);
