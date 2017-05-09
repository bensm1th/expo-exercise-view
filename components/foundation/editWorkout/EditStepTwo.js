import React from 'react';
import { Button, FormValidationMessage } from 'react-native-elements';
import { Text, View, Dimensions, StyleSheet, ScrollView } from 'react-native';
import colors from '../../../colors';
import ChoiceButton from '../choiceButton';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;
let headerHeight = SCREEN_HEIGHT * 0.1;
let choiceHeight = SCREEN_HEIGHT * 0.1;

export default EditStepTwo = props => {
    return (
        <View>
            <View style={styles.directions}>
                <Text style={styles.directionsText}>Step Two: Add or delete exercises.</Text>
            </View>
            <View style={styles.choiceContainer}>
                <ChoiceButton 
                    choiceOne="ADD" 
                    choiceTwo="DELETE"
                    selected={props.exerciseEditOption}
                    onPress={props.onChoiceButtonPress}
                />
            </View>
            <ScrollView style={styles.stepTwoScrollView}>
                {props.renderExercisesList()}
            </ScrollView>
            {props.errorMessage.length > 0 &&
                <FormValidationMessage>{props.errorMessage}</FormValidationMessage>    
            }
            <View style={styles.stepTwoBottom}>
                {props.exerciseEditOption === 'left' &&
                <Button 
                    buttonStyle={styles.buttonStyle}
                    onPress={() => props.incrementStepAdd()}
                    title="NEXT"
                    backgroundColor={colors.secondary.light}
                />
                }
                {props.exerciseEditOption !== 'left' &&
                <Button 
                    buttonStyle={styles.buttonStyle}
                    onPress={props.removeExercisesFromWorkout}
                    title="DELETE"
                    backgroundColor={colors.primary.medium}
                />
                }
                <Button 
                    buttonStyle={styles.buttonStyle}
                    onPress={() => props.moveEditStep(false)}
                    title="BACK"
                    backgroundColor={colors.secondary.dark}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: 125,
        marginLeft: 0,
        marginRight: 0
    },
    stepTwoBottom: {
        paddingTop: SCREEN_HEIGHT * 0.025,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: SCREEN_WIDTH * 0.05
    },
    stepTwoScrollView: {
        width: SCREEN_WIDTH * 0.9,
        marginLeft: SCREEN_WIDTH * 0.05,
        maxHeight: SCREEN_HEIGHT * 0.55,
    },
    listContainer: {
        width: SCREEN_WIDTH * 0.9,
        marginLeft: SCREEN_WIDTH * 0.05,
        height: SCREEN_HEIGHT * 0.60,
        marginBottom: SCREEN_HEIGHT * 0.05
    },
    choiceContainer: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
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
    buttonContainer: {
        width: SCREEN_WIDTH * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
        setsListContainer: {
        backgroundColor: colors.background.light,
        borderWidth: 1,
        borderColor: colors.border.light,
        borderRadius: 3,
        height: SCREEN_HEIGHT * 0.5,
        marginBottom: SCREEN_HEIGHT * 0.05
    }
});
