import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements';
import ExercisesList from '../listViewExample';
import * as types from '../../../actions/types';
import colors from '../../../colors';

let SCREEN_HEIGHT = Dimensions.get("window").height;

const StepTwo = props => {

    return (
        <View>
            <View style={styles.directions}>
                <Text style={styles.directionsText}>Step 2: Choose Exercises to add to your workout.</Text>
            </View>
            <View
                style={styles.stepTwoList}
            >
                <ExercisesList
                    rightIcon={props.rightIcon}
                    onSelect={props.onExerciseSelect}
                />
            </View>
            {props.errorMessage.length > 0 &&
                <FormValidationMessage>{props.errorMessage}</FormValidationMessage>
            }
            <Button 
                title='FORWARD'
                onPress={() => {
                    props.fetchSelectedExercises();
                    props.incrementStep();
                }}
                backgroundColor={colors.secondary.light}
            />
            <Button 
                title='BACK'
                onPress={props.decrementStep}
                backgroundColor={colors.secondary.dark}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    directions: {
        height: SCREEN_HEIGHT * 0.08,
        justifyContent: 'center',
        alignItems: 'center'
    },
    directionsText: {
        fontSize: 20
    },
    stepTwoList: {
        height: SCREEN_HEIGHT * 0.5,
        marginBottom: SCREEN_HEIGHT * 0.035
    }
});

export default StepTwo;
