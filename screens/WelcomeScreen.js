import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import _ from 'lodash';
import Slides from '../components/Slides';
import colors from '../colors';
import * as actions from '../actions';

const SLIDE_DATA = [
    { text: 'Welcome to Exercise App!', color: colors.secondary.light },
    { text: 'Start by going to Setup and add exercises', color: colors.secondary.medium },
    { text: 'Then, add exercises to your workout', color: colors.secondary.dark },
    { text: 'Then, use Exercise App to track data during your workout', 
        color: colors.primary.light }
];

class WelcomeScreen extends Component {

    state = { token: null }
    
    async componentWillMount() {
        //await AsyncStorage.removeItem('fb_token');

        let token = await AsyncStorage.getItem('fb_token');
        if (token) {
            this.props.loadUser(token);
            this.props.navigation.navigate('home');
            this.setState({ token });
        } else {
            this.setState({ token: false });
        }
    }
    
    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }

    render() {
        if (_.isNull(this.state.token)) {
            return <AppLoading />;
        }
        return (
                <Slides 
                    onComplete={this.onSlidesComplete}
                    data={SLIDE_DATA} 
                />
        );
    }
}

export default connect(null, actions)(WelcomeScreen);
