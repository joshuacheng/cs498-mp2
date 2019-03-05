import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Button } from 'semantic-ui-react'
import axios from 'axios'

import CharacterList from './CharList';
import './CharacterSearch.css';

/** Rate limit: 3000 calls/day */
const PUBLIC_KEY = "143409854ea7dad3962b62316a567d0d";
// const PRIVATE_KEY = "c5ae7de3b072fa533e7d9563ae5c0f559c26b627";
const LIMIT = 100;


/** This class will handle API calls to GET Pokemon info */
export class CharacterSearch extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
        name: "",
        results: [],
        fieldValue: ""
    }

    this.shouldGET = true;
  }

  getInfo = () => {
    let url = `${this.props.baseUrl}?nameStartsWith=${this.state.fieldValue}&apikey=${PUBLIC_KEY}&limit=${LIMIT}`;

    axios.get(url).then(res => {
      if (res.status !== 200) {
        console.log(`bad request: Request Code ${res.status}`);
        return;
      }

      // console.log(res.data.data.results);
      this.setState({ 
        results: res.data.data.results
      })
    }).catch(err => {
      console.log(err.response);
    })
  }

  onChangeHandler = (event) => {
    this.setState({ 
      fieldValue: event.target.value 
    }, () => {
      if (this.state.fieldValue && this.state.fieldValue.length > 0) {
        if (this.shouldGET) {
          this.getInfo();
        } else {
          // Filter old results for starting with the new search string
          const newResults = this.state.results.filter(char => char.name.toLowerCase().
                                  startsWith(this.state.fieldValue.toLowerCase()));
          this.setState({
            results: newResults
          })
        }
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    /** If the user is typing more letters of a character's name,
     *  we shouldn't have to GET again because the list will be a strict
     *  subset of the previous one. We'll just filter the list in onChangeHandler.
     * REVIEW: Potential issue: because of LIMIT, some results might not show up on 
     *         the first query, but they should after a second letter has been typed. Looks like max
     *         limit is 100. For now I'll keep it like this because it's sick
    */
    if (this.state.fieldValue.includes(prevState.fieldValue) &&
        this.state.fieldValue.length > prevState.fieldValue.length &&
        prevState.fieldValue.length >= 1) {
          // console.log('changing');
        this.shouldGET = false;
    } else {
      this.shouldGET = true;
    }
  }

  render() {
    return (
      <div className='Character-searcher'>
        <Input className="App-input" size='small' label={ this.baseUrl } 
                 placeholder='Search...' onChange={ this.onChangeHandler }/>
        <Button className="Get-button" onClick={ this.getInfo } >
            GET
        </Button>
        <CharacterList list={ this.state.results } />
      </div>
    )
  }
}

CharacterSearch.propTypes = {
  baseUrl: PropTypes.string
}

export default CharacterSearch
