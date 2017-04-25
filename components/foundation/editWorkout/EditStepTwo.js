import React from 'react';
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet, ListView, ScrollView } from 'react-native';

import ChoiceButton from '../choiceButton';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;
let headerHeight = SCREEN_HEIGHT * .1;
let choiceHeight = SCREEN_HEIGHT * .1;

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
            <View style={styles.stepTwoBottom}>
                {props.exerciseEditOption === 'left' &&
                <Button 
                    buttonStyle={{ width: 125, marginLeft: SCREEN_WIDTH * .05,}}
                    onPress={() => props.incrementStepAdd()}
                    title="ADD"
                    backgroundColor="#8f9bff"
                />
                }
                {props.exerciseEditOption !== 'left' &&
                <Button 
                    buttonStyle={{ width: 125, marginLeft: SCREEN_WIDTH * .05,}}
                    onPress={props.removeExercisesFromWorkout}
                    title="DELETE"
                    backgroundColor="#f44330"
                />
                }
                <Button 
                    buttonStyle={{ width: 125, marginLeft: SCREEN_WIDTH * .05,}}
                    onPress={() => props.moveEditStep(false)}
                    title="BACK"
                    backgroundColor="#0043cb"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stepTwoBottom: {
        paddingTop: SCREEN_HEIGHT * .025,
        flexDirection: 'row'
    },
    stepTwoScrollView: {
        width: SCREEN_WIDTH * .9,
        marginLeft: SCREEN_WIDTH * .05,
        height: SCREEN_HEIGHT *.55,
    },
    listContainer: {
        width: SCREEN_WIDTH * .9,
        marginLeft: SCREEN_WIDTH * .05,
        height: SCREEN_HEIGHT *.60,
        marginBottom: SCREEN_HEIGHT * .05
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
        width: SCREEN_WIDTH * .9,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
        setsListContainer: {
        backgroundColor: '#f7f7f7',
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 3,
        height: SCREEN_HEIGHT *.5,
        marginBottom: SCREEN_HEIGHT * .05
    }
})