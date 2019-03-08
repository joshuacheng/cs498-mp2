import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

import axios from 'axios'

export class CharacterView extends Component {
    
    infoToDisplay = () => {
        if (this.props.infoToDisplay === 'stories') {
            return (
                <p>Featured in { this.props.stories.available } stories</p>
            )
        } else if (this.props.infoToDisplay === 'series') {
            return (
                <p>Featured in { this.props.series.available } series</p>
            )
        } else {
            console.log('Error: intoToDisplay is not one of the possible types');
            return (
                <p></p>
            )
        }
    }

    render() {

        let imgPath = this.props.thumbnail.path;
        let extension = this.props.thumbnail.extension;

        return (
            <Card>
                <Card.Content>
                    <Card.Header>{ this.props.name }</Card.Header>
                    {/* <Image src={ `${imgPath}/standard_fantastic.${extension}` } size='large'></Image> */}
                </Card.Content>
                <Card.Content extra>
                    {this.infoToDisplay()}
                </Card.Content>
            </Card>
        )
    }
}

export default CharacterView
