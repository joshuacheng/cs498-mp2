import React, { Component } from 'react';
import marvel_logo from './assets/marvel-logo.png';
import CharacterSearch from './CharacterSearch';
import './ListView.css';

class ListView extends Component {

  constructor(props) {
    super(props);
    this.baseUrl = 'https://gateway.marvel.com/v1/public/characters';
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo">
            <img src={marvel_logo} alt="logo" />
          </div>
          <CharacterSearch baseUrl={ this.baseUrl }/>
        </header>
      </div>
    );
  }
}

export default ListView;
