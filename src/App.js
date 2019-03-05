import React, { Component } from 'react';
import poke_logo from './assets/pokemon-logo.png';
import CharacterSearch from './CharacterSearch';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.baseUrl = 'https://gateway.marvel.com/v1/public/characters';
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={poke_logo} className="App-logo" alt="logo" />
          <CharacterSearch baseUrl={ this.baseUrl }/>
        </header>
      </div>
    );
  }
}

export default App;
