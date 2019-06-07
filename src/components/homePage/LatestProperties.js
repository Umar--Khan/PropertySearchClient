import React, { Component } from "react";
import Slide1 from "../../img/property-1.jpg";
import Slide2 from "../../img/property-2.jpg";
import Slide3 from "../../img/property-4.jpg";

class LatestProperties extends Component {
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
          <div className="col l4">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={Slide1} alt="test" />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  Card Title<i className="material-icons right">more_vert</i>
                </span>
                <p>
                  <a href="#">This is a link</a>
                </p>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  Card Title<i className="material-icons right">close</i>
                </span>
                <p>
                  Here is some more information about this product that is only
                  revealed once clicked on.
                </p>
              </div>
            </div>
          </div>
          <div className="col l4">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={Slide2} alt="test" />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  Card Title<i className="material-icons right">more_vert</i>
                </span>
                <p>
                  <a href="#">This is a link</a>
                </p>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  Card Title<i className="material-icons right">close</i>
                </span>
                <p>
                  Here is some more information about this product that is only
                  revealed once clicked on.
                </p>
              </div>
            </div>
          </div>
          <div className="col l4">
            <div className="card">
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={Slide3} alt="test" />
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  Card Title<i className="material-icons right">more_vert</i>
                </span>
                <p>
                  <a href="#">This is a link</a>
                </p>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  Card Title<i className="material-icons right">close</i>
                </span>
                <p>
                  Here is some more information about this product that is only
                  revealed once clicked on.
                </p>
              </div>
            </div>
          </div>
          <div />
        </div>
      </div>
    );
  }
}

export default LatestProperties;
