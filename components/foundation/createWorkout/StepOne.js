import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import * as types from '../../../actions/types';

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
                value={props.name}
            />
            <FormLabel>Description:</FormLabel>
            <FormInput
                onChangeText={(text) => props.changeText(types.CHANGE_WORKOUT_DESCRIPTION, text)}
                value={props.description}
            />
            <Button 
                title='FORWARD'
                onPress={props.incrementStep}
                backgroundColor='#8f9bff'
            />
            <Button 
                title='BACK'
                onPress={props.onBack}
                backgroundColor='#0043cb'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    directions: {
        height: SCREEN_HEIGHT * .08,
        justifyContent: 'center',
        alignItems: 'center'
    },
    directionsText: {
        fontSize: 20
    },
});

export default StepOne;