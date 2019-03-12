import React, { Component } from 'react'
import CharacterView from './CharacterView'
import PropTypes from 'prop-types'
import './CharList.css'

export class CharList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listIds: this.props.list.map(a => a.id)
        }
    }

    render() {
        console.log('rendering');
        // console.log(this.props.sortValue);
        
        this.props.list.sort((a, b) => {
            // console.log('sorting');
            if (this.props.sortAscending === true) {
                // console.log('sort ascending');
                // if (this.props.sortValue === 'stories') {
                //     return a.stories.available - b.stories.available;
                // } else if (this.props.sortValue === 'series') {
                //     return a.series.available - b.series.available;
                // } else {
                //     console.log('something bad');
                // }
                /** REVIEW: POTENTIALLY DANGEROUS */
                return a[this.props.sortValue]["available"] - b[this.props.sortValue]["available"];
            } else {
                // if (this.props.sortValue === 'stories') {
                //     return b.stories.available - a.stories.available;
                // } else if (this.props.sortValue === 'series') {
                //     return b.series.available - a.series.available;
                // } else {
                //     console.log('very bad');
                // }
                return b[this.props.sortValue]["available"] - a[this.props.sortValue]["available"];
            }
        })

        console.log(this.state.listIds);

        return (
            <div className='character-list'>
                { this.props.list.map((info) => (
                    <CharacterView key={info.id} id={info.id} info={info} infoToDisplay={this.props.sortValue}/>
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
    })),
    sortAscending: PropTypes.bool,
    sortValue: PropTypes.string
}

export default CharList
