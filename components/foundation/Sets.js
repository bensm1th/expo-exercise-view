import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import * as types from '../../actions/types';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;

class Sets extends Component {
    render() {
        const { exerciseId, id } = this.props;
        return (
            <View style={styles.setContainer}>
            <Text>weight:</Text>
            <TextInput 
                value={this.props.weight} 
                style={styles.inputStyle} 
                onChangeText={text => this.props.changeSetTextMethod(text, types.CHANGE_SET_WEIGHT_TEXT, id, exerciseId)}
            />
            <Text>reps: </Text>
            <TextInput 
                value={this.props.reps} 
                style={styles.inputStyle} 
                onChangeText={text => this.props.changeSetTextMethod(text, types.CHANGE_SET_REPS_TEXT, id, exerciseId)}
            />
            <Icon 
                name="cancel"
                size={30}
                color={'#f44330'}
            />
        </View>
        )
    }
}

const styles = StyleSheet.create({
    setContainer: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: SCREEN_WIDTH * .025,
        paddingLeft: SCREEN_WIDTH * .025,
    },
    inputStyle: {
        height: 40,
        width: 80,
        alignSelf: 'center',
        borderColor: 'gray',
        borderWidth: 1
    }
});

export default Sets;
