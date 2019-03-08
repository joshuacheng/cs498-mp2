import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'

import ListView from './ListView'
import GalleryView from './GalleryView'

export class App extends Component {
  render() {
    return (
        <Router>
            <Switch>
                <Route exact path='/' component={ListView}/>
                <Route exact path='/gallery' component={GalleryView}/>
           </Switch>
        </Router>
    )
  }
}

export default App
