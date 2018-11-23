import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';

var AllPlaces = []

class MapContainer extends Component {
state = {
showingInfoWindow: false,
activeMarker: {},
selectedPlace: {},
query:'',
filteredPlaces: [],
hasError: false,
};

markers = []



async componentWillMount() {
    const axiosData = await axios
      .get(
        'https://api.foursquare.com/v2/venues/search?ll=40.7589,-73.9851&query=food&radius=2000&categoryId=4d4b7105d754a06374d81259&client_id=INOHETWKCQHOZUPUATJJ503RCWMUXPFUOCJCHRN2LRADAZJO&client_secret=1ABUWB4S3QS41A50X1UJFHC4THA2YQGOBNOBUSRARLZ4DE5W&v=20201215&limit=10'
      )
      .then(response =>
        response.data.response.venues.map(v => (
          AllPlaces.push(
          {
          name: v.categories[0].name.toLowerCase(),
          lat: v.location.lat,
          lng: v.location.lng,
        })
      ))
      );
    this.setState({axiosData})
  }

componentDidCatch(error, info){
  this.setState({hasError:true});
  console.log(error,info)
}

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
if(this.state.hasError){
  return <h1>Something went wrong in loading the Map</h1>
}
return (
  <div className = 'map-container' role='application' style=
{{marginleft:'250px'}}>
    <div>
      <div className = 'navMenu'>
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
          key = {i}
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
