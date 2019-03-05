import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

import axios from 'axios'

export class CharacterView extends Component {
    
    render() {

        let imgPath = this.props.thumbnail.path;
        let extension = this.props.thumbnail.extension;

        return (
            <Card>
                <Card.Content>
                    <Card.Header>{ this.props.name }</Card.Header>
                    {/* <Image src={ `${imgPath}/standard_fantastic.${extension}` } size='large'></Image> */}
                </Card.Content>
            </Card>
        )
    }
}

export default CharacterView
