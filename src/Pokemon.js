import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Button } from 'semantic-ui-react'
import axios from 'axios'

import './Pokemon.css';


/** This class will handle API calls to GET Pokemon info */
export class Pokemon extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);
    
    this.state = {
        name: "",
        pokemon: {},
        fieldValue: ""
    }

    this.baseUrl = this.props.baseUrl;

  }

  clickHandler = () => {
    let url = `${this.baseUrl}${this.state.fieldValue}`;

    
  }

  onChangeHandler = (event) => {
    this.setState({ fieldValue: event.target.value });
  }

  render() {
    return (
      <div className='Pokemon-searcher'>
        <Input className="App-input" size='small' label={ this.baseUrl } 
                 placeholder='Search...' onChange={ this.onChangeHandler }/>
        <Button onClick={ this.clickHandler } >
            GET
        </Button>
      </div>
    )
  }


}

export default Pokemon
