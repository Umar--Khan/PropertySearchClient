import React, { Component } from "react";
import { connect } from "react-redux";

import Slide1 from "../../img/property-1.jpg";
import Slide2 from "../../img/property-2.jpg";
import Slide3 from "../../img/property-4.jpg";

import { saveSingleProperty } from "../../actions/propertyActions";
import { adzunaAPIKey, adzunaAPPKey } from "../../apiKeys";

class LatestProperties extends Component {
  state = {
    properties: ""
  };

  componentDidMount() {
    const randomPostcodes = ["EC2A%201NT", ["EC3V%203LA"], ["SW1A%201AA"]];

    const random =
      randomPostcodes[Math.floor(Math.random() * randomPostcodes.length)];
    console.log(random);

    let endpoint = `https://cors-anywhere.herokuapp.com/https://api.adzuna.com:443/v1/api/property/gb/search/1?app_id=${adzunaAPPKey}&app_key=${adzunaAPIKey}&results_per_page=3&where=${random}&distance=0.1&category=for-sale`;

    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    };

    fetch(endpoint, {
      headers: headers
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ properties: data.results });
      })
      .catch(error => {
        console.log(error);
      });
  }

  slideselector = () => {
    const randomPics = [Slide1, Slide2, Slide3];
    return randomPics[Math.floor(Math.random() * randomPics.length)];
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
            <a className="black-text right" href="#!">
              All Properties
              <i className="material-icons" style={{ marginTop: "4px" }}>
                keyboard_arrow_right
              </i>
            </a>
          </div>
        </div>
        <div className="row">
          {this.state.properties &&
            this.state.properties.map(property => (
              <div className="col l4" key={property.id}>
                <div className="card">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img
                      className="activator"
                      src={this.slideselector()}
                      alt="test"
                    />
                  </div>
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">
                      {property.title}
                      <i className="material-icons right">more_vert</i>
                    </span>
                    <p className="center">
                      <a href="#">View more info</a>
                    </p>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">
                      {property.title}
                      <i className="material-icons right">close</i>
                    </span>
                    <p>{property.description}</p>
                  </div>
                </div>
              </div>
            ))}
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
  { saveSingleProperty }
)(LatestProperties);
