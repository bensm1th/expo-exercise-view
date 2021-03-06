import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { Button, FormValidationMessage } from 'react-native-elements';
import colors from '../../../colors';

let SCREEN_HEIGHT = Dimensions.get('window').height;
let SCREEN_WIDTH = Dimensions.get('window').width;

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
                    onPress={props.decrementStep}
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
        marginTop: 10,
        marginLeft: 0,
        marginRight: 0
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: SCREEN_WIDTH * 0.9,
        marginHorizontal: SCREEN_WIDTH * 0.05
    }
});

export default StepThree;
