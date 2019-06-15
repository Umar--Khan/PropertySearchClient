import React, { Component } from "react";
import { connect } from "react-redux";

class ErrorPage extends Component {
  render() {
    return (
      <div>
        {this.props.error === "No Search Term" ? (
          <div
            className="container"
            style={{ minHeight: "25rem", marginTop: "5rem" }}
          >
            <div className="col l6 m6 s6">
              <h4 className="center-align">Search Term Required</h4>
            </div>
          </div>
        ) : (
          <> </>
        )}
        {this.props.error === "Loading" ? (
          <div className="container" style={{ minHeight: "25rem" }}>
            <div className="col l6 m6 s6">
              <h4 className="center-align">Loading</h4>
              <div className="progress">
                <div className="indeterminate" />
              </div>
            </div>
          </div>
        ) : (
          <> </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.search.error
});

export default connect(
  mapStateToProps,
  null
)(ErrorPage);
