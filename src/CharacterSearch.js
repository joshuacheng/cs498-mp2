import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Button, Icon } from 'semantic-ui-react'
import axios from 'axios'

import CharacterList from './CharList';
import './CharacterSearch.css';

/** Rate limit: 3000 calls/day */
const PUBLIC_KEY = "143409854ea7dad3962b62316a567d0d";
// const PRIVATE_KEY = "c5ae7de3b072fa533e7d9563ae5c0f559c26b627";
const LIMIT = 100;


/**
 * TODO: 1. add sort by feature in list view
 *       2. sort descending or ascending 
 *       3. probably stop using the shouldGET optimization
 *       4. add gallery view
 * 
 */

/** This class will handle API calls to GET Pokemon info */
export class CharacterSearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      results: [],
      fieldValue: "",
      sortAscending: true /** When sortAscending false, we sort by descending */
    }
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
          const newResults = this.state.results.filter(char => {
            return char.name.toLowerCase().startsWith(this.state.fieldValue.toLowerCase());
          });
          this.setState({
            results: newResults
          })
        }
      }
    });
  }

  doSort = isAscending => {
    if (isAscending === this.state.sortAscending) {
      return;
    } else if (isAscending === false) {
      this.setState({
        sortAscending: false
      })
    } else if (isAscending === true) {
      this.setState({
        sortAscending: true
      })
    } else {
      console.log('error: contact author');
    }
  }

  onClickHandler = event => {
    /** React UI elements handle onclick differently than normal JS, hence the this.as */
    if (event.currentTarget.className === 'ui icon button') { 
      const command = event.currentTarget.firstChild.className; 
      console.log(command);
      if (command === 'sort amount up icon') {
        this.doSort(true);
      } else if (command === 'sort amount down icon') {
        this.doSort(false);
      }
    }

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
        <div className='search-stuff'>
          <Input className="App-input" size='small' label={this.baseUrl}
          placeholder='Search...' onChange={this.onChangeHandler} />
        
          <Button icon onClick={this.onClickHandler}>
            <Icon name='sort amount up' />
          </Button>
          <Button icon onClick={this.onClickHandler}>
            <Icon name='sort amount down' />
          </Button>
        </div>
        <CharacterList list={this.state.results} />
      </div>
    )
  }
}

CharacterSearch.propTypes = {
  baseUrl: PropTypes.string
}

export default CharacterSearch
