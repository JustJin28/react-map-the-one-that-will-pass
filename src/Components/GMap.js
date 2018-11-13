import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

var  AllPlaces = [
      {
        "name" : "Pizza",
        "lat": "40.7589",
        "lng":"-73.9851",
      },

      {
        "name" : "Cookies",
        "lat": "40.7690",
        "lng":"-73.9952",
      }
    ]

class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
      <div className = 'map-container' style={{marginleft:'250px'}}>
        <Map google={this.props.google} zoom={14}
          initialCenter = {{lat:40.7589, lng:-73.9851}}
          onClick={this.onMapClicked}>
          <Marker
            onClick={this.onMarkerClick}
            title = {AllPlaces[0].name}
            name={AllPlaces[0].name}
            position = {{lat:AllPlaces[0].lat,lng:AllPlaces[0].lng}}/>
          <Marker
            onClick={this.onMarkerClick}
            title = {AllPlaces[1].name}
            name={AllPlaces[1].name}
            position = {{lat:AllPlaces[1].lat,lng:AllPlaces[1].lng}}/>
          <InfoWindow
            onOpen={this.windowHasOpened}
            onClose={this.windowHasClosed}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC21SntdNn1vCb5VOAujCPIM7a9p5XkvRs'
})(MapContainer)
