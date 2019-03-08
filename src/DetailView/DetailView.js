import React, { Component } from 'react'
import axios from 'axios'

const PUBLIC_KEY = "143409854ea7dad3962b62316a567d0d";

export class DetailView extends Component {

  state = {
    data: null
  }


  componentDidMount() {
    const baseUrl = 'https://gateway.marvel.com/v1/public/characters/'

    const fullUrl = `${baseUrl}${this.props.match.params.charId}
                ?apikey=${PUBLIC_KEY}`

    axios.get(fullUrl).then(res => {
      if (res.status !== 200) {
        console.log(`bad request: Request Code ${res.status}`);
        return;
      }

      this.setState({
        data: res.data
      })

    }).catch(err => {
      console.log(err.response);
    })
  }

  render() {
    if (this.state.data === null) {
      return (
        <p>Loading...</p>
      )
    } else {
      return (
        <div>
          <p>{ this.props.match.params.charId }</p>
          <p>detailed view</p>
          <p>{ this.state.data.data.results[0].name }</p>
        </div>
      )
    }
  }
}

export default DetailView
