import React, { Component } from 'react';
import { Text, View } from 'react-native'
import Slides from '../components/Slides';
import colors from '../colors';

const SLIDE_DATA = [
    { text: 'Welcome to Exercise App!', color: colors.secondary.light },
    { text: 'Start by going to Setup and add exercises', color: colors.secondary.medium },
    { text: 'Then, add exercises to your workout', color: colors.secondary.dark },
    { text: 'Then, use Exercise App to track data during your workout', color: colors.primary.light }
];

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