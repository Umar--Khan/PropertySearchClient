import React, { Component } from "react";
import ReactStreetview from "react-streetview";
import M from "materialize-css";

import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  position: "absolute",
  width: "50%",
  height: "50%"
};

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
    var fenway = { lat: 42.345573, lng: -71.098326 };
    var map = new google.maps.Map(document.getElementById("map"), {
      center: fenway,
      zoom: 14
    });
    var panorama = new google.maps.StreetViewPanorama(
      document.getElementById("pano"),
      {
        position: fenway,
        pov: {
          heading: 34,
          pitch: 10
        }
      }
    );
    map.setStreetView(panorama);

    const el = document.querySelectorAll(".tabs");
    M.Tabs.init(el);
  }

  render() {
    const googleMapsApiKey = "AIzaSyAoe5F9tcpX9_AigGhnmKCdQm3qPQLh4zE";
    const streetViewPanoramaOptions = {
      position: { lat: this.props.lat, lng: this.props.lng },
      pov: { heading: 100, pitch: 0 },
      zoom: 1
    };
    return (
      <div class="row">
        <div class="col s12">
          <ul class="tabs">
            <li class="tab col s6">
              <a href="#test1">Map View</a>
            </li>
            <li class="tab col s6">
              <a class="active" href="#test2">
                Street View
              </a>
            </li>
          </ul>
        </div>
        <div id="test1" class="col s12">
          <div className="container">
            <Map
              google={this.props.google}
              zoom={14}
              style={mapStyles}
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
        </div>
        <div id="test2" class="col s12">
          <div
            style={{
              width: "800px",
              height: "450px",
              backgroundColor: "#eeeeee"
            }}
          >
            <ReactStreetview
              apiKey={googleMapsApiKey}
              streetViewPanoramaOptions={streetViewPanoramaOptions}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAoe5F9tcpX9_AigGhnmKCdQm3qPQLh4zE"
})(GoogleMapPage);
