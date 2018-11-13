import React, { Component } from 'react';
import './App.css';
import MapContainer from './Components/GMap';
import ListPlaces from './Components/ListPlaces';

class App extends Component {
  render() {
    return(
      <div className = 'Main-App'>
        <ListPlaces/>
        <MapContainer/>
      </div>
    )
  }
}
export default App;
