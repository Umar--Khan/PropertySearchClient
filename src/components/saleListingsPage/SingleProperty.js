import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import M from "materialize-css";
import { Link } from "react-router-dom";
import { backupUrls, getRandomInt } from "./backupUrls";

import ImageSlider from "./ImageSlider";
import GoogleMap from "./GoogleMapPage";

import { errorPage } from "../../actions/searchActions";
import LatestPropertiesCards from "../homePage/LatestPropertiesCards";
import { adzunaAPIKey, adzunaAPPKey } from "../../apiKeys";
import { saveCurrentUser } from "../../actions/userActions";

class SingleProperty extends Component {
  state = {
    urls: "",
    clicked: false,
    properties: "",
    similarProperties: ""
  };

  componentDidMount() {
    window.scrollBy(0, -9000);
    if (!this.props.singleProperty) {
      if (this.props.match.url.includes("property-for-rent")) {
        return this.props.history.push("/property-for-rent/search");
      } else {
        return this.props.history.push("/property-for-sale/search");
      }
    }

    this.clickedIfFavourite();

    this.getImageUrls();
    this.getSimilarProperties();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.urls !== this.state.urls) {
      const el = document.querySelectorAll(".tabs");
      M.Tabs.init(el);
    }

    if (prevProps.singleProperty.id !== this.props.singleProperty.id) {
      this.setState({ urls: "", clicked: false });
      this.getImageUrls();
      this.getSimilarProperties();
      this.clickedIfFavourite();
      window.scrollBy(0, -9000);
    }
  }

  isFavourite() {
    return this.props.currentUser.properties.some(
      property => property.id === this.props.singleProperty.id
    );
  }

  clickedIfFavourite = () => {
    if (this.props.currentUser) {
      if (this.isFavourite()) {
        this.setState({ clicked: true });
      }
    }
  };

  getImageUrls = () => {
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
          .then(resp => {
            console.log(resp);
            if (resp.config.url.includes("zoopla")) {
              this.setState({
                urls: JSON.parse(this.sanitazeData(resp.data).join(""))
              });
            } else if (resp.config.url.includes("onedome")) {
              this.setState({
                urls: this.sanitazeOneDome(resp.data)
              });
            } else if (resp.config.url.includes("smartnewhomes")) {
              this.setState({
                urls: this.sanitazeNewsmart(resp.data)
              });
            } else {
              this.setState({
                urls: backupUrls(getRandomInt(1, 10))
              });
            }
          })
          .catch(err =>
            console.log(err, this.props.singleProperty.redirect_url)
          );
      });
  };

  getSimilarProperties = () => {
    const { singleProperty } = this.props;

    let postcode = encodeURIComponent(singleProperty.postcode);
    let type = singleProperty.category.tag;

    let endpoint = `https://cors-anywhere.herokuapp.com/https://api.adzuna.com:443/v1/api/property/gb/search/1?app_id=${adzunaAPPKey}&app_key=${adzunaAPIKey}&results_per_page=10&where=${postcode}&distance=1&category=${type}`;

    const headers = {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    };

    fetch(endpoint, {
      headers: headers
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ properties: data.results, loaded: true });
      })
      .then(data => this.shortenList())
      .catch(error => {
        console.log(error);
      });
  };

  numberWithCommas = x => {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return "3,000";
    }
  };

  getElements = (html, selector) => {
    const parser = new DOMParser(); // the parser that will parse the html
    const dom = parser.parseFromString(html, "text/html"); // parse the text in 'html' as html
    const elems = dom.querySelectorAll(selector); // select the elements that match the CSS selector 'selector'
    // return their outerHTML (elems is an array like object so map is not defined thus we have to call it in this way)
    return Array.prototype.map.call(elems, function(e) {
      return e.outerHTML;
    });
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

  sanitazeOneDome = data => {
    const images = this.getElements(data, ".flickity-gallery__img");

    let imagesUrls = {
      pictures: []
    };

    for (let i = 0; i < images.length; i++) {
      let test = images[i].match(
        /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g
      );
      test = test[1];
      test = test.replace("src=", "");
      test = test.replace(/"/g, "");
      imagesUrls.pictures.push({ path: test, caption: i });
    }
    return imagesUrls;
  };

  sanitazeNewsmart = data => {
    console.log("NewSmartHomes");
    const images = this.getElements(data, ".lazy");

    let imagesUrls = {
      pictures: []
    };

    for (let i = 1; i < images.length; i++) {
      let test = images[i].match(
        /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g
      );
      test = test[0];
      test = test.replace(/data-src=/g, "");
      test = test.replace(/"/g, "");
      test = test.replace("/80/", "/645/");
      test = test.replace("/60/", "/430/");

      imagesUrls.pictures.push({ path: test, caption: i });
    }
    return imagesUrls;
  };

  getUser = () => {
    const apiUrl = "http://localhost:3001/api";
    const token = localStorage.getItem("token");

    if (token) {
      return fetch(apiUrl + "/user", {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Token ${token}`
        }
      })
        .then(resp => resp.json())
        .then(data => {
          if (data.user) {
            this.props.saveCurrentUser(data.user);
          }
        })
        .catch(err => console.log(err));
    }
  };

  favoriteProperty = (property, e) => {
    e.preventDefault();

    if (!this.props.currentUser) {
      M.toast({ html: "Log in to favorite" });
      return;
    }

    const apiUrl = "http://localhost:3001/api";
    const token = localStorage.getItem("token");

    const userId = this.props.currentUser._id;

    if (token) {
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
        .then(
          data => this.props.saveCurrentUser(data.user),
          M.toast(
            { html: "Added to Favourites" },
            this.setState({ clicked: true })
          )
        )
        .then(this.getUser())
        .catch(err => console.log(err));
    }
  };

  unFavoriteProperty = (property, e) => {
    e.preventDefault();
    const apiUrl = "http://localhost:3001/api";
    const token = localStorage.getItem("token");

    const userId = this.props.currentUser._id;

    if (token) {
      return fetch(apiUrl + `/${userId}/favorite`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: `Token ${token}`
        },
        body: JSON.stringify({ property: property })
      })
        .then(resp => resp.json())
        .then(
          M.toast(
            { html: "Removed from Favourites" },
            this.setState({ clicked: false })
          )
        )
        .then(this.getUser())
        .catch(err => console.log(err));
    }
  };

  shortenList = () => {
    const list = this.state.properties;

    let newList = [];

    if (this.state.properties) {
      for (let i = 0; i < 3; i++) {
        newList.push(
          list
            .sort(function() {
              return 0.5 - Math.random();
            })
            .pop()
        );
      }
    }
    this.setState({ similarProperties: newList });
  };

  render() {
    const { singleProperty } = this.props;
    return (
      <div>
        {singleProperty && (
          <div
            className="container"
            style={{ minHeight: "35rem", marginTop: "3rem" }}
          >
            <div className="row" style={{ marginBottom: "0" }}>
              <div className="col s8">
                <h5>
                  {singleProperty.title === "studio"
                    ? `Studio Flat ${singleProperty.category.label}`
                    : `${singleProperty.title}`}
                </h5>
              </div>
              <div className="col s4">
                <h4
                  className="right-align teal-text text-lighten-2"
                  style={{ marginTop: "4px" }}
                >
                  {singleProperty.sale_price
                    ? `£${this.numberWithCommas(singleProperty.sale_price)}`
                    : `£${this.numberWithCommas(
                        singleProperty.price_per_month
                      )} pcm`}
                </h4>
              </div>
            </div>
            <div className="row">
              <div className="col s6">
                <h6>
                  {singleProperty.location.display_name}
                  {", "}
                  {singleProperty.location.area[1]}
                </h6>
              </div>
              <div className="col s6" style={{ marginTop: "9px" }}>
                <Link
                  to={
                    singleProperty.sale_price
                      ? "/property-for-sale/search/"
                      : "/property-for-rent/search/"
                  }
                  style={{
                    display: "flex",
                    float: "right"
                  }}
                >
                  <i className="material-icons">arrow_back</i>
                  <span>Go To Property Search</span>
                </Link>
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
              <div className="row">
                <div className="col s12">
                  <ul className="tabs">
                    <li className="tab col s4">
                      <a className="active teal-text" href="#property-details">
                        <i className="material-icons" style={marginRight5px}>
                          home
                        </i>{" "}
                        Property Details
                      </a>
                    </li>
                    <li className="tab col s4">
                      <a href="#floorplan" className="teal-text">
                        <i className="material-icons" style={marginRight5px}>
                          pages
                        </i>{" "}
                        Floorplan
                      </a>
                    </li>
                    <li className="tab col s4">
                      <a href="#map" className="teal-text">
                        <i className="material-icons" style={marginRight5px}>
                          pin_drop
                        </i>{" "}
                        Map & Street View
                      </a>
                    </li>
                  </ul>
                </div>
                <div
                  id="property-details"
                  className="col s12"
                  style={{ marginTop: "3rem" }}
                >
                  <div className="col s12">
                    <div className="col s4 center" style={centerIcons}>
                      <i className="material-icons">hotel</i>
                      {singleProperty.beds} bedrooms
                    </div>
                    <div className="col s4 center" style={centerIcons}>
                      <i className="material-icons">grain</i>1 bathroom
                    </div>
                    <div className="col s4 center" style={centerIcons}>
                      <i className="material-icons">weekend</i>1 reception room
                    </div>
                  </div>
                  <div className="col s12">
                    <div
                      className="divider teal"
                      style={{ marginTop: "3rem" }}
                    />
                    <div className="section">
                      <h4>Property description</h4>
                      <p>{singleProperty.description}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col col l6 s12 m12">
                      <div
                        className="divider teal"
                        style={{ marginTop: "3rem" }}
                      />
                      <div className="section">
                        <div className="col s12" style={{ marginLeft: "6rem" }}>
                          <h5>You could get up to 200mb</h5>
                        </div>
                        <div className="col s12">
                          <div className="col s3">
                            <i
                              className="material-icons"
                              style={{ fontSize: "5rem" }}
                            >
                              wifi
                            </i>
                          </div>
                          <div className="col s9">
                            <h4 style={{ marginTop: "1px" }}>
                              Ultrafast Broadband
                            </h4>
                            <h6>(Source: Virgin)</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="col l6 s12 m12">
                        <div
                          className="divider teal"
                          style={{ marginTop: "3rem" }}
                        />
                        <div className="section">
                          <div
                            className="col s6 left"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {this.state.clicked ? (
                              <div>
                                <p
                                  className="btn-floating btn-medium light-blue"
                                  onClick={e =>
                                    this.unFavoriteProperty(singleProperty, e)
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <i className="material-icons">delete</i>
                                </p>
                                <p>Delete from favourites</p>
                              </div>
                            ) : (
                              <div>
                                <p
                                  className="btn-floating btn-medium teal"
                                  onClick={e =>
                                    this.favoriteProperty(singleProperty, e)
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <i className="material-icons">
                                    favorite_border
                                  </i>
                                </p>
                                <p>Save this property</p>
                              </div>
                            )}
                            <div>
                              <p
                                className="btn-floating btn-medium teal"
                                style={{ cursor: "pointer" }}
                              >
                                <i className="material-icons">share</i>
                              </p>
                              <p style={{ marginLeft: "10px" }}>
                                Share this property
                              </p>
                            </div>
                          </div>
                          <div className="col s6 right">
                            <h6 style={{ marginTop: "0", fontWeight: "500" }}>
                              Agent Details:
                            </h6>
                            <a
                              // href={
                              //   singleProperty.agent.display_name
                              //     ? `https://www.google.com/search?q=${
                              //         singleProperty.agent.display_name
                              //       }`
                              //     : `https://www.google.com/search?q=`
                              // }
                              href="https://www.google.com/search?q="
                              style={semiBoldText}
                            >
                              {/* {singleProperty.agent.display_name &&
                                singleProperty.agent.display_name} */}
                              Regal Homes
                            </a>
                            <p>
                              Crown House Kentish Town Road, London, NW5 2TP
                            </p>
                            <p>Call: 020 8012 1907</p>
                            <a
                              // href={
                              //   singleProperty.agent.display_name &&
                              //   `https://www.google.com/search?q=${
                              //     singleProperty.agent.display_name
                              //   }`
                              // }
                              href="https://www.google.com/search?q="
                            >
                              <button className="waves-effect waves-light btn">
                                Request Details
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
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
              </div>
            </div>
            <div className="col s12 l12 m12">
              <div className="divider teal" style={{ marginTop: "1rem" }} />
              <div className="section">
                <h4>Similar properties in {singleProperty.location.area[3]}</h4>
                <div className="row">
                  {this.state.similarProperties &&
                    this.state.similarProperties.map(property => (
                      <LatestPropertiesCards
                        property={property}
                        key={property.id}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const semiBoldText = { fontSize: "1.6rem", fontWeight: "400" };
const marginRight5px = { marginRight: "5px" };
const centerIcons = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const mapStateToProps = state => ({
  singleProperty: state.property.singleProperty,
  error: state.search.error,
  currentUser: state.user.currentUser
});

export default connect(
  mapStateToProps,
  { errorPage, saveCurrentUser }
)(SingleProperty);
