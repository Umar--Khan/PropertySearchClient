import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import M from "materialize-css";
import { Link } from "react-router-dom";

import ImageSlider from "./ImageSlider";
import GoogleMap from "./GoogleMapPage";

import { errorPage } from "../../actions/searchActions";

class SingleProperty extends Component {
  state = {
    urls: ""
  };

  componentDidMount() {
    if (!this.props.singleProperty) {
      return this.props.history.push("/property-for-sale/search");
    }

    window.scrollBy(0, -window.innerHeight);

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/${
          this.props.singleProperty.redirect_url
        }`
      )
      .then(res => {
        axios
          .get(
            `https://cors-anywhere.herokuapp.com/${
              res.data.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/)[2]
            }`
          )
          .then(pls => {
            console.log(pls);
            if (pls.config.url.includes("zoopla")) {
              this.setState({
                urls: JSON.parse(this.sanitazeData(pls.data).join(""))
              });
            } else {
              this.setState({
                urls: this.backupUrls()
              });
            }
          })
          .catch(err =>
            console.log(err, this.props.singleProperty.redirect_url)
          );
      });
  }

  backupUrls = () => {
    return {
      pictures: [
        {
          path:
            "https://lid.zoocdn.com/645/430/cb907b09f20d517020ac6ec47df2ab9a62d57987.jpg",
          caption: ""
        },
        {
          path:
            "https://lid.zoocdn.com/645/430/2669ddeea3833f3a06550682b65c5267b8f6b07c.jpg",
          caption: ""
        },
        {
          path:
            "https://lid.zoocdn.com/645/430/b4cbef78217aae4817de31dc45c7592d1fa4a610.jpg",
          caption: ""
        },
        {
          path:
            "https://lid.zoocdn.com/645/430/aa368e61116c4b52865f1a0d1e95cbd7bebf19ea.jpg",
          caption: ""
        },
        {
          path:
            "https://lid.zoocdn.com/645/430/c61955b03f7c18ecd2bb0ffabfa51c1c3fa72d25.jpg",
          caption: ""
        },
        {
          path:
            "https://lid.zoocdn.com/645/430/6ae543f544f13b9c377ad8a57d8489a747f03ef5.jpg",
          caption: ""
        },
        {
          path:
            "https://lid.zoocdn.com/645/430/c7cc7c64f0a48d685c0dd2dd112b5bc3c0a35afe.jpg",
          caption: ""
        },
        {
          path:
            "https://lid.zoocdn.com/645/430/41bbe109ea46b2cce9cc254827599c32425cb342.jpg",
          caption: ""
        },
        {
          path:
            "https://lid.zoocdn.com/645/430/0ff7a6191f27b6938a070c9f0f61392b8cb72635.jpg",
          caption: ""
        }
      ]
    };
  };

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  sanitazeData = data => {
    let result = `{"pictures" : ${data
      .match(/galleryItems =(.*)<\/script>/s)[1]
      .split("</script>")[0]
      .split("path")
      .join('"path"')
      .split("caption")
      .join('"caption"')
      .replace(";", "")}}`;

    const index = result.lastIndexOf(",");
    return result.split("").map((item, pos) => {
      if (pos !== index) {
        return item;
      }
    });
  };

  favoriteProperty = (property, e) => {
    e.preventDefault();

    if (!this.props.currentUser) {
      M.toast({ html: "Log in to favorite" });
      return;
    }

    e.target.parentElement.remove();
    const apiUrl = "http://localhost:3001/api";
    const token = localStorage.getItem("token");

    const userId = this.props.currentUser._id;

    if (token) {
      e.target.parentElement.remove();
      return fetch(apiUrl + `/${userId}/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({ property: property })
      })
        .then(resp => resp.json())
        .then(data => this.props.saveCurrentUser(data.user))
        .catch(err => console.log(err));
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.urls !== this.state.urls) {
      const el = document.querySelectorAll(".tabs");
      M.Tabs.init(el);
    }
  }

  render() {
    const { singleProperty } = this.props;
    return (
      <div>
        {singleProperty && (
          <div className="container" style={{ minHeight: "35rem" }}>
            <div className="row">
              <div className="col l12 s12 m12">
                <h5>
                  {singleProperty.title === "studio"
                    ? `Studio Flat ${singleProperty.category.label}`
                    : `${singleProperty.title}`}
                </h5>
                <h4 className="right-align teal-text text-lighten-2">
                  {singleProperty.sale_price &&
                    `£${this.numberWithCommas(singleProperty.sale_price)}`}
                </h4>
                <h6>{singleProperty.location.display_name}</h6>
                <div className="right-align">
                  <Link
                    to={"/property-for-sale/search"}
                    className="right-align"
                  >
                    <i className="material-icons">arrow_back</i>
                    Go To Property Search
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col l12 s12 m12">
                {this.state.urls ? (
                  <ImageSlider images={this.state.urls.pictures} />
                ) : (
                  <div className="row center" style={{ paddingTop: "10rem" }}>
                    <div className="slider">
                      <div>
                        <div className="preloader-wrapper big active">
                          <div className="spinner-layer spinner-blue">
                            <div className="circle-clipper left">
                              <div className="circle" />
                            </div>
                            <div className="gap-patch">
                              <div className="circle" />
                            </div>
                            <div className="circle-clipper right">
                              <div className="circle" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col l8 s12 m8">
              <a
                className="btn-floating red"
                onClick={e => this.favoriteProperty(singleProperty, e)}
                href="#"
              >
                <i className="material-icons">favorite_border</i>
              </a>
              <div className="row">
                <div className="col s12">
                  <ul className="tabs">
                    <li className="tab col s4">
                      <a className="active" href="#property-details">
                        <i className="material-icons">home</i> Property Details
                      </a>
                    </li>
                    <li className="tab col s4">
                      <a href="#floorplan">
                        <i className="material-icons">pages</i> Floorplan
                      </a>
                    </li>
                    <li className="tab col s4">
                      <a href="#map">
                        <i className="material-icons">pin_drop</i> Map & Street
                        View
                      </a>
                    </li>
                    {/* <li className="tab col s3">
                  <a href="#">Market Stats</a>
                </li> */}
                  </ul>
                </div>
                <div
                  id="property-details"
                  className="col s12"
                  style={{ marginTop: "3rem" }}
                >
                  <div className="col s12">
                    <div className="col s4 center">
                      <i className="material-icons">hotel</i>
                      {singleProperty.beds} bedrooms
                    </div>
                    <div className="col s4 center">
                      <i className="material-icons">grain</i>1 bathroom
                    </div>
                    <div className="col s4 center">
                      <i className="material-icons">weekend</i>1 reception room
                    </div>
                  </div>
                  <div className="col s12">
                    <div className="divider" style={{ marginTop: "3rem" }} />
                    <div className="section">
                      <h4>Property description</h4>
                      <p>{singleProperty.description}</p>
                    </div>
                  </div>
                  <div className="col s12">
                    <div className="divider" />
                    <div className="section">
                      <h5>You could get up to 200mb</h5>
                      <i
                        className="material-icons"
                        style={{ fontSize: "5rem" }}
                      >
                        wifi
                      </i>
                      <h3>Ultrafast Broadband</h3>
                    </div>
                  </div>
                </div>
                <div id="floorplan" className="col s12">
                  <div className="container center">
                    <img
                      src="https://www.newerahomes.com/css/images/floorplans/hamilton-pres.png"
                      alt="floorplan"
                      width="75%"
                      style={{ marginTop: "5rem" }}
                    />
                  </div>
                </div>
                <div id="map" className="col s12">
                  <GoogleMap
                    lng={singleProperty.longitude}
                    lat={singleProperty.latitude}
                  />
                </div>
                {/* <div id="test4" className="col s12">
              Test 4
            </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  singleProperty: state.property.singleProperty,
  error: state.search.error,
  currentUser: state.user.currentUser
});

export default connect(
  mapStateToProps,
  { errorPage }
)(SingleProperty);
