import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Image } from 'semantic-ui-react'
import axios from 'axios'
import './GalleryView.css'

const PUBLIC_KEY = "143409854ea7dad3962b62316a567d0d";


export class GalleryView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      charList: [],
      filterValue: 'all'
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

  clickHandler = e => {
    console.log(e.target.value);

    this.setState({
      filterValue: e.target.value
    })
  }

  render() {

    if (this.state.charList === null) {
      return (
        <h3>Loading...</h3>
      )
    } else {
      console.log(this.state.charList);
      const filteredList = this.state.charList.filter(char => {
        if (this.state.filterValue === 'all') {
          return true;
        } else if (this.state.filterValue === 'has image') {
          return !char.thumbnail.path.endsWith('image_not_available');
        } else if (this.state.filterValue === 'has desc') {
          return char.description !== '';
        }
      })

      return (
        <div>
          <div className='header'>
          <Link to={process.env.PUBLIC_URL + '/'}>List View</Link>

          <div className='subheader'>
            <Button value='all' onClick={ this.clickHandler }>All</Button>
            <Button value='has image' onClick={ this.clickHandler }>Has Image</Button>
            <Button value='has desc' onClick={ this.clickHandler }>Has Description</Button>
          </div>
          </div>
          <Image.Group>
            {filteredList.map(char => (
              <Link key={`${char.id}`} to={process.env.PUBLIC_URL + `/details/${char.id}`}>
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
