import React from 'react';
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet, ListView, ScrollView } from 'react-native';
import * as types from '../../../actions/types';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;
let headerHeight = SCREEN_HEIGHT * .1;
let choiceHeight = SCREEN_HEIGHT * .1;

export default EditStepOne = props => {
    return (
        <View>
            <View style={styles.directions}>
                <Text style={styles.directionsText}>Step One: Edit workout name or description</Text>
            </View>
            <View style={styles.stepOneContainer}>
                <FormLabel>Name:</FormLabel>
                <FormInput 
                    onChangeText={(text) => props.changeText(types.CHANGE_EDIT_WORKOUT_NAME, text)}
                    value={props.name}
                />
                <FormLabel>Description:</FormLabel>
                <FormInput 
                    onChangeText={(text) => props.changeText(types.CHANGE_EDIT_WORKOUT_DESCRIPTION, text)}
                    value={props.description}
                />
            </View>
                <Button 
                    buttonStyle={{ width: 125, marginLeft: SCREEN_WIDTH * .05}}
                    onPress={() => props.moveEditStep(true)}
                    title="FORWARD"
                    backgroundColor="#8f9bff"
                />
                <Button 
                    buttonStyle={{ width: 125, marginLeft: SCREEN_WIDTH * .05}}
                    onPress={() => props.moveEditStep(false)}
                    title="BACK"
                    backgroundColor="#0043cb"
                />
        </View>  
    )
}

const styles = StyleSheet.create({
    stepOneContainer: {
        backgroundColor: "#f7f7f7",
        marginLeft: SCREEN_WIDTH * .05,
        width: SCREEN_WIDTH * .9,
        marginBottom: SCREEN_HEIGHT * .05,
        paddingBottom: SCREEN_HEIGHT * .025
    },
    directions: {
        marginTop: 15,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    directionsText: {
        fontSize: 20
    },
})