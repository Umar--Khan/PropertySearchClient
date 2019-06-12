import React, { Component } from "react";
import ErrorPage from "./ErrorPage";

import { connect } from "react-redux";

class PropertyListings extends Component {
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
                <h4 className="header">{result.title}</h4>
                <div className="card horizontal card small card-panel hoverable">
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
