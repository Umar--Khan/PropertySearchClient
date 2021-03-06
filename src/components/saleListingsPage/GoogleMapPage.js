import React, { Component } from "react";
import ReactStreetview from "react-streetview";
import M from "materialize-css";
import { googleAPI } from "../../apiKeys";

import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

export class GoogleMapPage extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    mapView: true
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  componentDidMount() {
    const el = document.querySelectorAll("#tabs-map-view");
    M.Tabs.init(el);
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const streetViewPanoramaOptions = {
      position: { lat: this.props.lat, lng: this.props.lng },
      pov: { heading: 50, pitch: 1 },
      zoom: 1
    };
    return (
      <div className="row">
        <div className="col s12">
          <ul className="tabs" id="tabs-map-view">
            <li className="tab col s6">
              <a href="#test1" className="active teal-text">
                Map View
              </a>
            </li>
            <li className="tab col s6">
              <a href="#test2" className="teal-text">
                Street View
              </a>
            </li>
          </ul>
        </div>
        <div
          id="test1"
          className="col s12"
          style={{
            marginTop: "3rem",
            position: "relative",
            width: "950px",
            height: "500px"
          }}
        >
          <Map
            google={this.props.google}
            zoom={14}
            initialCenter={{ lat: this.props.lat, lng: this.props.lng }}
          >
            <Marker onClick={this.onMarkerClick} name={"Property Location"} />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h4>{this.state.selectedPlace.name}</h4>
              </div>
            </InfoWindow>
          </Map>
        </div>
        <div
          id="test2"
          className="col s12 center"
          style={{ marginTop: "3rem" }}
        >
          <div
            style={{
              width: "800px",
              height: "450px",
              backgroundColor: "#eeeeee",
              margin: "0 auto"
            }}
          >
            <ReactStreetview
              apiKey={googleAPI}
              streetViewPanoramaOptions={streetViewPanoramaOptions}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleAPI
})(GoogleMapPage);
