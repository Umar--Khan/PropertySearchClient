import _ from "lodash";

import React, { Component } from "react";
import ErrorPage from "./ErrorPage";

import { connect } from "react-redux";
import { saveCurrentUser } from "../../actions/userActions";

class PropertyListings extends Component {
  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  favoriteProperty = (property, e) => {
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

  render() {
    if (this.props.error || !this.props.data.results) {
      return <ErrorPage />;
    }

    const { results, count } = this.props.data;

    return (
      <div className="container" style={{ minHeight: "25rem" }}>
        <div className="row">
          <div className="col l12 s12 m12">
            <p>Properties For Sale in</p>{" "}
            <p style={semiBoldText}>{this.props.searchTerm}</p>
            <p style={boldText}>{count}</p>
            <p>results</p>
          </div>
        </div>
        <div className="row">
          {results.map(result => (
            <React.Fragment key={result.id}>
              <div className="col l12 s12 m12">
                <div className="card horizontal card small card-panel hoverable">
                  <div className="card-image">
                    <a
                      className="btn-floating halfway-fab waves-effect waves-light red"
                      onClick={e => this.favoriteProperty(result, e)}
                      href="#"
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
        <ul className="pagination">
          <li className="disabled">
            <a href="#!">
              <i className="material-icons">chevron_left</i>
            </a>
          </li>
          <li className="active">
            <a href="#!">1</a>
          </li>
          <li className="waves-effect">
            <a href="#!">
              <i className="material-icons">chevron_right</i>
            </a>
          </li>
        </ul>
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
  currentUser: state.user.currentUser
});

export default connect(
  mapStateToProps,
  { saveCurrentUser }
)(PropertyListings);
