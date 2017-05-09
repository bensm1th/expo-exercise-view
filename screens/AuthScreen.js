import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {

    componentDidMount() {
        // await AsyncStorage.removeItem('fb_token');
        this.props.facebookLogin();
        this.onAuthComplete(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props) {
        if (props.auth.fb_token) {
            this.props.navigation.navigate('home');
        }
    }

    render() {
        return (
            <View>
                <ActivityIndicator
                    animating
                    style={styles.centering}
                    size='large'
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
        centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        height: 80
    },
});

const mapStateToProps = state => {
    const { auth } = state;
    return { auth };
};

export default connect(mapStateToProps, actions)(AuthScreen);
