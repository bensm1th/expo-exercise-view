import React, { Component } from 'react';
import { Text, View } from 'react-native'
import { Icon } from 'react-native-elements';
import ListTitle from '../components/foundation/listTitle';

class StatsScreen extends Component {

    static navigationOptions = {
        title: 'Stats',
        tabBar: {
            icon: ({ tintColor }) => {
                return <Icon 
                    name="show-chart"
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
                <ListTitle title="Stats" />
                <Text>StatsScreen</Text>
                <Text>StatsScreen</Text>
                <Text>StatsScreen</Text>
                <Text>StatsScreen</Text>
                <Text>StatsScreen</Text>
            </View>
        );
    }
}

export default StatsScreen;