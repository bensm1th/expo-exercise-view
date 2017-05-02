import React from 'react';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import colors from '../../../colors';
import * as types from '../../../actions/types';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;

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
            {props.errorMessage.length > 0 &&
                <FormValidationMessage>{props.errorMessage}</FormValidationMessage>
            }
                <Button 
                    buttonStyle={{ width: 125, marginLeft: SCREEN_WIDTH * 0.05 }}
                    onPress={() => props.moveEditStep(true)}
                    title="FORWARD"
                    backgroundColor={colors.secondary.light}
                />
                <Button 
                    buttonStyle={{ width: 125, marginLeft: SCREEN_WIDTH * 0.05 }}
                    onPress={() => props.moveEditStep(false)}
                    title="BACK"
                    backgroundColor={colors.secondary.dark}
                />
        </View>  
    )
}

const styles = StyleSheet.create({
    stepOneContainer: {
        backgroundColor: colors.background.light,
        marginLeft: SCREEN_WIDTH * 0.05,
        width: SCREEN_WIDTH * 0.9,
        marginBottom: SCREEN_HEIGHT * 0.05,
        paddingBottom: SCREEN_HEIGHT * 0.025
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