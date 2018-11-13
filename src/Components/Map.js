import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";


const newMap = withGoogleMap(props => { return
<GoogleMap
defaultZoom={12}
defaultCenter = {lat:40.7589, lng:-73.9851}
></GoogleMap>
})



class Map extends Component{
  render(){
    return
    <div className = "Main-map">
      <newMap/>
    </div>
  }

}

export default Map
