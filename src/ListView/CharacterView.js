import React, { Component } from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import './CharacterView.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import DetailView from './../DetailView/DetailView'


export class CharacterView extends Component {

    infoToDisplay = () => {
        if (this.props.infoToDisplay === 'stories') {
            return (
                <p>Featured in {this.props.info.stories.available} stories</p>
            )
        } else if (this.props.infoToDisplay === 'series') {
            return (
                <p>Featured in {this.props.info.series.available} series</p>
            )
        } else {
            console.log('Error: intoToDisplay is not one of the possible types');
            return (
                <p></p>
            )
        }
    }

    render() {

        let imgPath = this.props.info.thumbnail.path;
        let extension = this.props.info.thumbnail.extension;

        return (
            <div>
                <Link to={process.env.PUBLIC_URL + `/details/${this.props.id}`}>
                    <Card className='character-card'>
                        <Card.Content>
                            <Card.Header>{this.props.info.name}</Card.Header>
                            {/* <Image src={ `${imgPath}/standard_fantastic.${extension}` } size='large'></Image> */}
                        </Card.Content>
                        <Card.Content extra>
                            {this.infoToDisplay()}
                        </Card.Content>
                    </Card>
                </Link>
            </div>
        )
    }
}

export default CharacterView
