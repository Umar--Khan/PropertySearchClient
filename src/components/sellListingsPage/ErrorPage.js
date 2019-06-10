import React, { Component } from "react";

class ErrorPage extends Component {
  render() {
    return (
      <div className="container" style={{ minHeight: "25rem" }}>
        <div className="col l6 m6 s6">
          <h4 className="center">Sorry No Results Found</h4>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
