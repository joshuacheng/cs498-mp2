import React, { Component } from 'react';
import poke_logo from './assets/pokemon-logo.png';
import Pokemon from './Pokemon';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.baseUrl = 'https://pokeapi.co/api/v2/';
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={poke_logo} className="App-logo" alt="logo" />
          <Pokemon baseUrl={ this.baseUrl }/>
        </header>
      </div>
    );
  }
}

export default App;
