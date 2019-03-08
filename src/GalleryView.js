import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class GalleryView extends Component {

    constructor(props) {
        super(props);



    }

  render() {
    return (
      <div>
        <Link to='/'>List View</Link>
        <p>hello world</p>
      </div>
    )
  }
}

export default GalleryView
