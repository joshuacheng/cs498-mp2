import React, { Component } from 'react'
import marvel_logo from './assets/marvel-logo.png';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import CharacterSearch from './ListView/CharacterSearch'
import GalleryView from './GalleryView'
import './App.css'

export class App extends Component {
    render() {
        return (
            <div className="App-header">
                <div className="App-logo">
                    <img src={marvel_logo} alt="logo" />
                </div>
                <Router>
                    <Switch>
                        <Route exact path='/' component={CharacterSearch} />
                        <Route exact path='/gallery' component={GalleryView} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App
