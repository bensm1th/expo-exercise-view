import React, { Component } from 'react';
import { Text, View } from 'react-native'
import { Icon } from 'react-native-elements';

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
        return (
            <View>
                <Text>HomeScreen</Text>
                <Text>HomeScreen</Text>
                <Text>HomeScreen</Text>
                <Text>HomeScreen</Text>
                <Text>HomeScreen</Text>
            </View>
        );
    }
}

export default HomeScreen;