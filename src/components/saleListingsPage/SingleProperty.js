import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import M from "materialize-css";
import { Link } from "react-router-dom";

import ImageSlider from "./ImageSlider";
import GoogleMap from "./GoogleMap";

const singleProperty = {
  image_url:
    "https://s3-eu-west-1.amazonaws.com/property.adzuna.co.uk/668a7360f69314ab6eb093e9082ef96cd7562aa2a3ab8ebed5a02feb2be9de7f.jpeg",
  postcode: "N17EH",
  created: "2019-05-30T13:08:08Z",
  __CLASS__: "Adzuna::API::Response::Property",
  adref:
    "eyJhbGciOiJIUzI1NiJ9.eyJzIjoiM2xKVHVKNnFTM09xTGVhWWdxbE9aUSIsImkiOjExNjYxNjc1NjB9.rY69uZ-lHvy6GvmhSfUfmk9f0en_w9yZIskLDglH2K8",
  sale_price: 895000,
  description:
    "Warehouse style apartment This exceptionally bright 1,033 sqft 3-bed, 2-bath apartment with full height crittall windows and a balcony forms part of Eagle Wharf Road - a stylish collection of thirty-six - 1,2 and 3 bedroom warehouse style apartments on Eagle Wharf Road, situated in the heart of Hoxton. Eagle Wharf Road offers modern, easy living in one of London's most vibrant neighbourhoods. The surrounding streets and canals are packed with galleries and museums, pubs and eccentric cocktail j…",
  agent: {
    __CLASS__: "Adzuna::API::Response::Agent",
    display_name: "Stone Real Estate"
  },
  title: "3 bed flat for sale in Eagle Wharf Road",
  latitude: 51.534529,
  longitude: -0.090377,
  redirect_url:
    "https://property.adzuna.co.uk/land/ad/1084780442?se=NUJH-cZDSkqGVlXzoNonaQ&utm_medium=api&utm_source=68f473fd&v=8725D733CA0731EAE1E909CF9163BC67BE0DF225",
  category: {
    tag: "for-sale",
    label: "For Sale",
    __CLASS__: "Adzuna::API::Response::Category"
  },
  location: {
    display_name: "Hoxton, North London",
    __CLASS__: "Adzuna::API::Response::Location",
    area: ["UK", "London", "North London", "Hoxton"]
  },
  property_type: "flat",
  is_furnished: "0",
  beds: 3,
  id: 1166167560
};

class SingleProperty extends Component {
  //   componentDidMount() {
  // if (!this.props.singleProperty) {
  //   this.props.history.push("/property-for-sale/search");
  // }
  //   }

  state = {
    urls: ""
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
      if (pos != index) {
        return item;
      }
    });
  };

  componentDidMount() {
    axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://property.adzuna.co.uk/land/ad/1084780442?se=ZBLm4IerSH2PrYkeasziYQ&utm_medium=api&utm_source=68f473fd&v=8725D733CA0731EAE1E909CF9163BC67BE0DF225"
      )
      .then(res =>
        axios
          .get(
            `https://cors-anywhere.herokuapp.com/${
              res.data.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/)[2]
            }`
          )
          .then(pls => {
            this.setState({
              urls: JSON.parse(this.sanitazeData(pls.data).join(""))
            });
          })
      );
  }

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
    if (!this.state.urls) {
      return <h1>loading</h1>;
    }
    return (
      <div className="container" style={{ minHeight: "35rem" }}>
        <div className="row">
          <div className="col l12 s12 m12">
            <h5>{singleProperty.title}</h5>
            <h4 className="right-align teal-text text-lighten-2">
              £{this.numberWithCommas(singleProperty.sale_price)}
            </h4>
            <h6>{singleProperty.location.display_name}</h6>
            <div className="right-align">
              <Link to={"/property-for-sale/search"} className="right-align">
                <i className="material-icons">arrow_back</i>
                Go Back
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col l12 s12 m12">
            <ImageSlider images={this.state.urls.pictures} />
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
                    <i className="material-icons">pin_drop</i> Map & Street View
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
                  <i className="material-icons" style={{ fontSize: "5rem" }}>
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
                longitude={singleProperty.longitude}
                latitude={singleProperty.latitude}
              />
            </div>
            {/* <div id="test4" className="col s12">
              Test 4
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  singleProperty: state.property.singleProperty
});

export default connect(
  mapStateToProps,
  null
)(SingleProperty);
