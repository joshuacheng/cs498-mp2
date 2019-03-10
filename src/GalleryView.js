import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react'
import axios from 'axios'

const PUBLIC_KEY = "143409854ea7dad3962b62316a567d0d";


export class GalleryView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      charList: []
    }
  }

  //TODO: find a way to cache this info so i don't have to reload gallery pictures every time
  componentDidMount() {
    const baseUrl = 'https://gateway.marvel.com/v1/public/characters'

    // console.log(this.props.match.params.charId);
    const fullUrl = `${baseUrl}?limit=100&apikey=${PUBLIC_KEY}`

    axios.get(fullUrl).then(res => {
      if (res.status !== 200) {
        console.log(`bad request: Request Code ${res.status}`);
        return;
      }
      this.setState({
        charList: res.data.data.results
      })

    }).catch(err => {
      console.log(err.response);
    })
  }

  render() {

    if (this.state.charList === null) {
      return (
        <h3>Loading...</h3>
      )
    } else {
      // console.log(this.state.charList);
      return (
        <div>
          <Link to='/'>List View</Link>
          <Image.Group>
            {this.state.charList.map(char => (
              <Link key={`${char.id}`} to={`/details/${char.id}`}>
                <Image src={`${char.thumbnail.path}/portrait_medium.${char.thumbnail.extension}`} rounded />
              </Link>
            ))}
          </Image.Group>
        </div>
      )
    }

  }
}

export default GalleryView
