import React, { Component } from "react";
import ErrorPage from "./ErrorPage";

import { connect } from "react-redux";

class PropertyListings extends Component {
  render() {
    if (this.props.error) {
      return <ErrorPage />;
    }
    if (this.props.data.results) {
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
                  <h4 className="header">{result.title}</h4>
                  <div className="card horizontal card small">
                    <div className="card-image">
                      <img src={result.image_url} alt="thumbnail" />
                    </div>
                    <div className="card-stacked">
                      <div className="card-content">
                        <p>{result.description}</p>
                      </div>
                      <div className="card-action">
                        <a href="#">View more info</a>
                      </div>
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
    } else {
      return (
        <div className="container" style={{ minHeight: "25rem" }}>
          <div className="row">
            <div className="col l12 m12 s12">
              <h3 className="center">Try Searching</h3>
            </div>
          </div>
        </div>
      );
    }
  }
}

const boldText = { fontSize: "1.7rem", fontWeight: "500" };
const semiBoldText = { fontSize: "1.5rem", fontWeight: "400" };

const mapStateToProps = state => ({
  data: state.search.data,
  searchTerm: state.search.searchTerm,
  error: state.search.error
});

export default connect(
  mapStateToProps,
  null
)(PropertyListings);

// {
//       "is_furnished": "0",
//       "location": {
//         "__CLASS__": "Adzuna::API::Response::Location",
//         "display_name": "Finsbury Park, North London",
//         "area": [
//           "UK",
//           "London",
//           "North London",
//           "Finsbury Park"
//         ]
//       },
//       "title": "3 bed flat for sale in Devan Grove",
//       "postcode": "N42GS",
//       "__CLASS__": "Adzuna::API::Response::Property",
//       "longitude": -0.095974,
//       "redirect_url": "https://property.adzuna.co.uk/land/ad/1065773369?se=b1nJRrdKSWGhJREaR2M5Ng&utm_medium=api&utm_source=68f473fd&v=42159A990B2040926B89BB0718D517C8A441F491",
//       "beds": 3,
//       "id": 1065773369,
//       "category": {
//         "__CLASS__": "Adzuna::API::Response::Category",
//         "label": "For Sale",
//         "tag": "for-sale"
//       },
//       "adref": "eyJhbGciOiJIUzI1NiJ9.eyJpIjoxMDY1NzczMzY5LCJzIjoiYjFuSlJyZEtTV0doSlJFYVIyTTVOZyJ9.WjIjBrQxxAPa59_GMK4iQ4VGnRjV-tcL-sY6F6axVAA",
//       "image_url": "https://s3-eu-west-1.amazonaws.com/property.adzuna.co.uk/a5ace14850737b228f170aaa46f6d00bf82e549b3fd6b18cdbb32a26859b23e6.jpeg",
//       "property_type": "flat",
//       "description": "Key featuresStunning three bedroom apartment (one en suite bathrooms)Hi Spec Fixtures and Fittings Very large ,modern reception room leading to the BalconyFeatures sleek kitchen with integrated appliancesWater ViewsOn suite 24hr concierge, landscaped communal gardensAccess to on site gymnasiumWalking Distance of Manor House Station",
//       "created": "2019-01-25T01:36:00Z",
//       "latitude": 51.564301,
//       "sale_price": 950000
//     }
