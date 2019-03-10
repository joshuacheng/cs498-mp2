import React, { Component } from 'react'
import axios from 'axios'
import './DetailView.css'
import { Card, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const PUBLIC_KEY = "143409854ea7dad3962b62316a567d0d";

export class DetailView extends Component {

  state = {
    data: null
  }


  componentDidMount() {
    const baseUrl = 'https://gateway.marvel.com/v1/public/characters/'

    // console.log(this.props.match.params.charId);
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
      const imgPath = this.state.data.data.results[0].thumbnail.path;
      const extension = this.state.data.data.results[0].thumbnail.extension;

      console.log(this.props);
      return (
        <div className='detail-view'>

          <Link to='/'>List View   </Link>| 
          <Link to='/gallery'>   Gallery View</Link>

          <Card className='character-card'>
            <Image src={`${imgPath}/standard_fantastic.${extension}`} size='large'></Image>
            <Card.Content header={this.state.data.data.results[0].name} textAlign='left' />
            <Card.Content>
              <p>{
                this.state.data.data.results[0].description ||
                'No description available'}</p>
            </Card.Content>
          </Card>
        </div>
      )
    }
  }
}

export default DetailView
