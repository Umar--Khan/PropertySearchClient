import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { adzunaAPIKey, adzunaAPPKey } from "../../apiKeys";
import LatestPropertiesCards from "./LatestPropertiesCards";

class LatestProperties extends Component {
  state = {
    properties: "",
    loaded: false
  };

  componentDidMount() {
    const { currentUser } = this.props;

    const randomPostcodes = ["EC2A%201NT", ["EC3V%203LA"], ["SW1A%201AA"]];

    let random =
      randomPostcodes[Math.floor(Math.random() * randomPostcodes.length)];

    if (currentUser.postcode) {
      console.log(currentUser.postcode);
      random = encodeURIComponent(currentUser.postcode);
    }

    let endpoint = `https://cors-anywhere.herokuapp.com/https://api.adzuna.com:443/v1/api/property/gb/search/1?app_id=${adzunaAPPKey}&app_key=${adzunaAPIKey}&results_per_page=10&where=${random}&distance=0.1&category=for-sale`;

    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    };

    fetch(endpoint, {
      headers: headers
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ properties: data.results, loaded: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  shortenList = () => {
    const list = this.state.properties;
    let newList = [];

    for (let i = 0; i < 3; i++) {
      newList.push(
        list
          .sort(function() {
            return 0.5 - Math.random();
          })
          .pop()
      );
    }
    return newList;
  };

  render() {
    return (
      <div className="container" style={{ marginBottom: "40px" }}>
        <div className="row">
          <div className="col s6 l6">
            <h4>Latest Properties</h4>
          </div>
          <div
            className="col s6 l6"
            style={{
              paddingTop: "23px",
              fontSize: "1.8rem",
              fontWeight: "300"
            }}
          >
            <Link to={"/property-for-sale/search"} className="black-text right">
              All Properties
              <i className="material-icons" style={{ marginTop: "4px" }}>
                keyboard_arrow_right
              </i>
            </Link>
          </div>
        </div>
        <div className="row">
          {this.state.properties ? (
            this.shortenList().map(property => (
              <LatestPropertiesCards property={property} key={property.id} />
            ))
          ) : (
            <div
              className="center"
              style={{ marginTop: "10rem", marginBottom: "10rem" }}
            >
              <h3>Getting Latest Data</h3>
              <div className="progress">
                <div className="indeterminate" />
              </div>
            </div>
          )}
          <div />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.search.data,
  currentUser: state.user.currentUser
});

export default connect(
  mapStateToProps,
  null
)(LatestProperties);
