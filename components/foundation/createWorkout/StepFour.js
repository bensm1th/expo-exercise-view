import React from 'react';
import { Text, View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;

const StepFour = props => {
    const { populatedExercises, exercises, createStep, createForm: { name, description } } = props.setup_workouts;
    return (
        <View>
            <View style={styles.directions}>
                <Text style={styles.directionsText}>Step 4: View and save your workout.</Text>
            </View>
            <View style={styles.workoutTitle}>
                <Text style={styles.workoutTitleText}>{name}</Text>
                <Text style={styles.workoutDescriptionText}>{description}</Text>
            </View>
            <View style={styles.scrollViewContainer}>
                <ScrollView>
                    {props.renderFinalExercises()}
                </ScrollView>
            </View>
            <Button 
                title='SAVE'
                onPress={props.saveWorkoutMethod}
                backgroundColor='#8f9bff'
            />
            <Button 
                title='BACK'
                onPress={props.decrementStep}
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
    scrollViewContainer: {
        height: SCREEN_HEIGHT * .5
    },
    workoutTitleText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    workoutDescriptionText: {
        fontSize: 16
    },
    workoutTitle: {
        backgroundColor: "#ff795b",
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StepFour;
