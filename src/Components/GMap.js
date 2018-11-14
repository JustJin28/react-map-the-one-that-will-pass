import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper
} from 'google-maps-react';

var  AllPlaces = [
{
"name" : "pizza",
"lat": "40.7589",
"lng":"-73.9851",
},

{
"name" : "cookies",
"lat": "40.7690",
"lng":"-73.9952",
},
{
"name" : "bagels",
"lat": "40.7489",
"lng":"-73.9751",
}
]

class MapContainer extends Component {
state = {
showingInfoWindow: false,
activeMarker: {},
selectedPlace: {},
query:'',
filteredPlaces: []
};

markers = []


onMarkerClick = (props, marker, e) => {
this.setState({
  selectedPlace: props,
  activeMarker: marker,
  showingInfoWindow: true
 });
}

onLiClick = (i) =>{
this.setState({
    showingInfoWindow: true,
    activeMarker: this.markers[i],
    selectedPlace: AllPlaces[i]
})
}


onMapClicked = (props) => {
if (this.state.showingInfoWindow) {
  this.setState({
    showingInfoWindow: false,
    activeMarker: null
  })
}
}


CreateInputField = () => (
<input
  placeholder = "Search Nearby Places"
  onChange={(event) => this.setState({filteredPlaces: AllPlaces.filter(place => !place.name.startsWith((event.target.value).toLowerCase()))})}
/>
)

render() {
return (
  <div className = 'map-container' style=
{{marginleft:'250px'}}>
    <div>
      <div className = 'sideMenu'>
        <div className = 'List'>
          <h1 className = 'title'> Places to Eat
</h1>
            {this.CreateInputField()}
        </div>
        <div className = 'PlaceList'>
          <ol className='Places'>
            {AllPlaces.map((arrayItem, index)=>
            !this.state.filteredPlaces.includes(arrayItem) &&
              <li
              key = {index}
              className='Place'
              onClick={() => {this.onLiClick(index)}}
              >{arrayItem.name}</li>
            )}
          </ol>
        </div>
      </div>
    </div>
    <Map google={this.props.google} zoom={14}
      initialCenter = {{lat:40.7589, lng:-73.9851}}
      onClick={this.onMapClicked}>
      {AllPlaces.map((marker, i) =>
        !this.state.filteredPlaces.includes(marker) &&
          <Marker
          ref={(e) => {if (e) this.markers[i] =
 e.marker}}
          onClick={this.onMarkerClick}
          title = {marker.name}
          name={marker.name}
          position =
{{lat:marker.lat,lng:marker.lng}}
          />
      )}
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
apiKey: 'AIzaSyD2BmXOGrCZQiAg5HJ6hU70BXc5v6Osr6M'
})(MapContainer)
