import React, { Component } from "react";

class LatestProperties extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s6 l6">
            <h4>Latest Properties</h4>
          </div>
          <div
            className="col s6 l6"
            style={{
              paddingTop: "23px",
              fontSize: "1.2rem",
              fontWeight: "300"
            }}
          >
            <a className="black-text" href="#!" style={{ float: "right" }}>
              All Properties
              <i className="material-icons">keyboard_arrow_right</i>
            </a>
          </div>
        </div>
        <div class="card-deck" />
      </div>
    );
  }
}

export default LatestProperties;
