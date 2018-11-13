import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';


class ListPlaces extends Component {

  CreateInputField = () => {
    return <input
    placeholder = "Search Nearby Places"
    />
  }


  render() {
    return(
      <div>
        <div className = 'sideMenu'>
          <div className = 'List'>
            <h1 className = 'title'> Places to Eat </h1>
            {this.CreateInputField()}
          </div>
          <div className = 'PlaceList'>
          </div>
        </div>
      </div>
    )
  }
}
export default ListPlaces
