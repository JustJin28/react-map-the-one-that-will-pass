import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

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

class ListPlaces extends Component {

  CreateInputField = () => {
    return <input
    placeholder = "Search Nearby Places"
    />
  }

  findPlaces = () => {
    return(
      <ol className='Places'>
        {AllPlaces.map((arrayItem, index)=>
          <li
          key = {index}
          className='Place'
          >{arrayItem.name}</li>
        )}
      </ol>
    )
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
            {this.findPlaces()}
          </div>
        </div>
      </div>
    )
  }
}
export default ListPlaces
