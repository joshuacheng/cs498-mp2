import React, { Component } from 'react'
import CharacterView from './CharacterView'
import PropTypes from 'prop-types'

export class CharList extends Component {

    // constructor(props) {
    //     super(props);

    // }

    render() {
        return (
            <div>
                { this.props.list.map((info) => (
                    <CharacterView key={info.id} thumbnail={info.thumbnail} name={info.name} />
                )) }
            </div>
        )
    }
}

CharList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
        thumbnail: PropTypes.shape({
            path: PropTypes.string,
            extension: PropTypes.string
        }),
        name: PropTypes.string
    }))
}

export default CharList
