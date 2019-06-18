import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Slide1 from "../../img/property-1.jpg";
import Slide2 from "../../img/property-2.jpg";
import Slide4 from "../../img/property-4.jpg";
import Slide5 from "../../img/property-5.jpg";
import Slide6 from "../../img/property-6.jpg";
import Slide7 from "../../img/property-7.jpg";
import Slide8 from "../../img/property-8.jpg";
import Slide9 from "../../img/property-9.jpg";
import Slide10 from "../../img/property-10.jpg";

import { saveSingleProperty } from "../../actions/propertyActions";
import { adzunaAPIKey, adzunaAPPKey } from "../../apiKeys";

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
        this.setState({ properties: data.results, loaded: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  slideselector = () => {
    const randomPics = [
      Slide1,
      Slide2,
      Slide4,
      Slide5,
      Slide6,
      Slide7,
      Slide8,
      Slide9,
      Slide10
    ];

    return randomPics
      .sort(function() {
        return 0.5 - Math.random();
      })
      .pop();
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
            this.state.properties.map(property => (
              <div className="col l4" key={property.id}>
                <div className="card">
                  <div className="card-image waves-effect waves-block waves-light">
                    {this.state.property ? (
                      <img
                        className="activator"
                        src={property.image_url}
                        alt="test"
                      />
                    ) : (
                      <img
                        className="activator"
                        src={this.slideselector()}
                        alt="test"
                      />
                    )}
                  </div>
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4 center">
                      £{this.numberWithCommas(property.sale_price)}
                      <i className="material-icons right">close</i>
                    </span>
                    <span className="card-title activator grey-text text-darken-4 center">
                      {property.title === "studio"
                        ? `Studio Flat in ${property.location.display_name}`
                        : property.title}
                      <i className="material-icons right">more_vert</i>
                    </span>
                    <p className="center">
                      <Link
                        to={`/property-for-sale/search/${property.id}`}
                        onClick={() => {
                          this.props.saveSingleProperty(property);
                        }}
                      >
                        View More Info
                      </Link>
                    </p>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4 center">
                      £{this.numberWithCommas(property.sale_price)}
                      <i className="material-icons right">close</i>
                    </span>
                    <p>{property.description}</p>
                  </div>
                </div>
              </div>
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
  { saveSingleProperty }
)(LatestProperties);
