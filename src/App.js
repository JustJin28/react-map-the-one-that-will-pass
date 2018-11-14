import React, { Component } from 'react';
import './App.css';
import MapContainer from './Components/GMap';

class App extends Component {
  render() {
    return(
      <div className = 'Main-App'>
        <MapContainer/>
      </div>
    )
  }
}
export default App;
