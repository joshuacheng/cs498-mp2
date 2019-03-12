import React, { Component } from 'react'
import marvel_logo from './assets/marvel-logo.png';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import CharacterSearch from './ListView/CharacterSearch'
import GalleryView from './GalleryView'
import DetailView from './DetailView/DetailView'
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
                        <Route exact path={process.env.PUBLIC_URL + '/gallery'} render={() => <GalleryView />} />
                        <Route exact path={process.env.PUBLIC_URL + '/'} render={() => <CharacterSearch/>} />
                        <Route exact path={process.env.PUBLIC_URL + '/details/:charId'} component={DetailView}/>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App
