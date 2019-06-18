import React, { Component } from "react";
import { connect } from "react-redux";

import ErrorPage from "./ErrorPage";
import PropertyCards from "./PropertyCards";

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
          <div className="col l12 s12 m12">
            <div className="col l4 m4 s4">
              <h6>Properties For Sale in {this.props.searchTerm}</h6>
            </div>
            <div className="col l4 m4 s4">
              <h5>{count}</h5>
              <h6>Results</h6>
            </div>
            <div className="col l4 m4 s4">
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
          </div>
        </div>
        <div className="divider" style={{ marginBottom: "3rem" }} />
        <div className="row">
          {results.map(result => (
            <PropertyCards result={result} key={result.id} />
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
