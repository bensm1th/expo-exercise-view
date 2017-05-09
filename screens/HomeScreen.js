import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import ListTitle from '../components/foundation/listTitle';
import * as actions from '../actions';
import colors from '../colors';

let SCREEN_HEIGHT = Dimensions.get('window').height;

class HomeScreen extends Component {

    static navigationOptions = {
        title: 'Home',
        tabBar: {
            icon: ({ tintColor }) => {
                return <Icon 
                    name="home"
                    size={30}
                    color={'white'}
                    iconStyle={{ marginTop: 10, marginBottom: 3 }}
                />
            }
        }
    }

    render() {
        const { firstName, lastName } = this.props.user;
        return (
            <View style={styles.container}>
                <ListTitle title="Home" />
                <View style={styles.body}>
                    <Text>Welcome</Text>
                    <Text>{firstName}</Text>
                    <Text>{lastName}</Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { auth, auth: { user } } = state;
    return {
        auth, user
    };
};

const styles = StyleSheet.create({
    body: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: colors.background.medium,
        flex: 1
    }
});

export default connect(mapStateToProps, actions)(HomeScreen);
