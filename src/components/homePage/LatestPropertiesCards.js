import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { saveSingleProperty } from "../../actions/propertyActions";

class LatestPropertiesCards extends Component {
  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    const { property } = this.props;
    return (
      <div className="col l4">
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <Link
              to={`/property-for-sale/search/${property.id}`}
              onClick={() => {
                window.scrollBy(0, -window.innerHeight);
                this.props.saveSingleProperty(property);
              }}
            >
              <img className="activator" src={property.image_url} alt="test" />
            </Link>
          </div>
          <div className="card-content">
            <span className="card-title teal-text center" style={semiBoldText2}>
              £{this.numberWithCommas(property.sale_price)}
            </span>
            <span
              className="card-title grey-text text-darken-4 center"
              style={semiBoldText}
            >
              {property.title === "studio"
                ? `Studio Flat in ${property.location.display_name}`
                : `${property.beds} bed in ${property.location.display_name}`}
            </span>
            <p className="center">
              <Link
                to={`/property-for-sale/search/${property.id}`}
                onClick={() => {
                  window.scrollBy(0, -window.innerHeight);
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
    );
  }
}

const semiBoldText = { fontSize: "1.5rem", fontWeight: "200" };
const semiBoldText2 = { fontSize: "2rem", fontWeight: "400" };

export default connect(
  null,
  { saveSingleProperty }
)(LatestPropertiesCards);
