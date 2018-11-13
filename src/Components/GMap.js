import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

class MapContainer extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}
      initialCenter = {{lat:40.7589, lng:-73.9851}}
      >
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC21SntdNn1vCb5VOAujCPIM7a9p5XkvRs'
})(MapContainer)
