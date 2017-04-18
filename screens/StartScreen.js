import React, { Component } from 'react';
import { Text, View, Picker, StyleSheet, Animated, Dimensions, TouchableHighlight  } from 'react-native'
import { Icon } from 'react-native-elements';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const showtimes = [{time: '12:30'},{time: '2:30'},{time: '4:30'}, {time:'5:30'}, {time:'6:30'}, {time:'7:00'}, {time:'8:30'}];
const PickerItem = Picker.Item;

class StartScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time: '7:00',
            modal: false,
            timeIndex:0,
            offSet: new Animated.Value(deviceHeight),
        }
    }

    changTime = time => {
        this.setState({
            time, timeIndex: time
        });
    }


    
    static navigationOptions = {
        title: 'Start',
        tabBar: {
            icon: ({ tintColor }) => {
                return <Icon 
                    name="plus"
                    size={30}
                    type="octicon"
                    color={'white'}
                    iconStyle={{ marginTop: 10, marginBottom: 3, marginLeft: 5 }}
                />
            }
        }
    }

    render() {
        return (
            <View>
            </View>
        );
    }
}


export default StartScreen;