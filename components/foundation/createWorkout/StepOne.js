import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements';
import * as types from '../../../actions/types';
import colors from '../../../colors';

let SCREEN_HEIGHT = Dimensions.get("window").height;

const StepOne = (props) => {
    return (
        <View style={styles.container}>
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
            <View style={styles.buttonContainer}>
                <Button 
                    buttonStyle={styles.buttonStyle}
                    title='NEXT'
                    onPress={props.incrementStep}
                    backgroundColor={colors.secondary.light}
                />
                <Button 
                    buttonStyle={styles.buttonStyle}
                    title='BACK'
                    onPress={props.onBack}
                    backgroundColor={colors.secondary.dark}
                />
                <Button 
                    buttonStyle={styles.buttonStyle}
                    title='CANCEL'
                    onPress={props.onCancel}
                    backgroundColor={colors.primary.dark}
                />
            </View>
            
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
    buttonStyle: {
        width: 110,
        height: 50,
        marginTop: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        backgroundColor: colors.background.medium,
        height: SCREEN_HEIGHT
    }
});

export default StepOne;
