import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements';
import * as types from '../../../actions/types';
import colors from '../../../colors';

let SCREEN_HEIGHT = Dimensions.get("window").height;

const StepOne = (props) => {
    return (
        <View>
            <View style={styles.directions}>
                <Text style={styles.directionsText}>Step 1: Enter workout information.</Text>
            </View>
            <FormLabel>Name:</FormLabel>
            <FormInput
                onChangeText={(text) => props.changeText(types.CHANGE_WORKOUT_NAME, text)}
                value={props.createForm.name}
            />
            <FormLabel>Description:</FormLabel>
            <FormInput
                onChangeText={(text) => props.changeText(types.CHANGE_WORKOUT_DESCRIPTION, text)}
                value={props.createForm.description}
            />
            {props.errorMessage.length > 0 &&
                <FormValidationMessage>{props.errorMessage}</FormValidationMessage>
            }
            <Button 
                buttonStyle={{ marginTop: 5 }}
                title='FORWARD'
                onPress={props.incrementStep}
                backgroundColor={colors.secondary.light}
            />
            <Button 
                title='BACK'
                onPress={props.onBack}
                backgroundColor={colors.secondary.dark}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    directions: {
        height: SCREEN_HEIGHT * 0.08,
        justifyContent: 'center',
        alignItems: 'center'
    },
    directionsText: {
        fontSize: 20
    },
});

export default StepOne;
