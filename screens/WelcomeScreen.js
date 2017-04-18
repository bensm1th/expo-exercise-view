import React, { Component } from 'react';
import { Text, View } from 'react-native'
import Slides from '../components/Slides';
const SLIDE_DATA = [
    { text: 'Welcome to Exercise App!', color: "#8F9BFF"},
    { text: 'Start by going to Setup and add exercises', color: "#536DFF"},
    { text: 'Then, add exercises to your workout', color: "#0043CB"},
    { text: 'Then, use Exercise App to track data during your workout', color: "#FF795B"}
]

class WelcomeScreen extends Component {

    onSlidesComplete = () => {
        this.props.navigation.navigate('main')
    }

    render() {
        return (
            <Slides 
                onComplete={this.onSlidesComplete}
                data={SLIDE_DATA} 
            />
        )
    }
}

export default WelcomeScreen;