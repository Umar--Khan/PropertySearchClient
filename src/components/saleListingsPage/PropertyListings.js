import React, { Component } from "react";
import { connect } from "react-redux";

import ErrorPage from "./ErrorPage";
import PropertyCards from "./PropertyCards";
import { Link } from "react-router-dom";

class PropertyListings extends Component {
  render() {
    if (this.props.error || !this.props.data.results) {
      return <ErrorPage />;
    }

    const { results, count } = this.props.data;

    const max = Math.ceil(
      parseInt(count) / parseInt(this.props.maxResultsNumber)
    );

    return (
      <div className="container" style={{ minHeight: "35rem" }}>
        <div className="divider" />
        <div className="row center-align" style={{ marginTop: "3rem" }}>
          <div className="col s12">
            <div className="col s4">
              <h6>Properties For Sale in {this.props.searchTerm}</h6>
            </div>
            <div className="col s4">
              <h5>{count}</h5>
              <h6>Results</h6>
            </div>
            <div className="col s4">
              <h6>
                {count >= 1 ? (
                  <span>
                    Page {this.props.pageNumber} of {max}
                  </span>
                ) : (
                  <> </>
                )}
              </h6>
            </div>
            <div className="col s12" style={{ marginTop: "5px" }}>
              <Link
                to={
                  this.props.match.url.includes("property-for-sale/search")
                    ? `/property-for-rent/search`
                    : `/property-for-sale/search`
                }
              >
                Switch search to{" "}
                {this.props.match.url.includes("property-for-sale/search")
                  ? "rent"
                  : "sale"}{" "}
                properties
              </Link>
            </div>
          </div>
        </div>
        <div className="divider" style={{ marginBottom: "3rem" }} />
        <div className="row">
          {results.map(result => (
            <PropertyCards result={result} key={result.id} {...this.props} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.search.data,
  searchTerm: state.search.searchTerm,
  error: state.search.error,
  pageNumber: state.search.pageNumber,
  maxResultsNumber: state.search.maxResultsNumber
});

export default connect(
  mapStateToProps,
  null
)(PropertyListings);
