import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Button, FormValidationMessage } from 'react-native-elements';
import colors from '../../../colors';

let SCREEN_HEIGHT = Dimensions.get("window").height;

const StepThree = props => {
    return (
        <View>
            <View style={styles.directions}>
                <Text style={styles.directionsText}>Step 3: Add sets to each exercise you chose.</Text>
            </View>
            <View>
                {props.renderSelectedExercises()}
            </View>
            <View>
            {props.errorMessage.length > 0 &&
                <FormValidationMessage>{props.errorMessage}</FormValidationMessage>
            }
            </View>
            <Button 
                title='FORWARD'
                onPress={props.incrementStep}
                backgroundColor={colors.secondary.light}
            />
            <Button 
                title='BACK'
                onPress={props.decrementStep}
                backgroundColor={colors.secondary.dark}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    directions: {
        height: SCREEN_HEIGHT * 0.08,
        justifyContent: 'center',
        alignItems: 'center'
    },
    directionsText: {
        fontSize: 20
    }
});

export default StepThree;
