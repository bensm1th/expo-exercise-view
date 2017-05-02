import React from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../../../colors';
import Timer from './timer';

let SCREEN_WIDTH = Dimensions.get("window").width;
let SCREEN_HEIGHT = Dimensions.get("window").height;

const calculateStatusInfo = exercises => {
    return exercises.reduce((init, exercise) => {
        let setsCompleted = 0;
        let points = 0;
        exercise.sets.forEach(set => {
            const { actual, goals } = set;
            if (actual.weight.length && actual.number.length) {
                setsCompleted++;
            }
            if (actual.weight >= goals.weight && actual.number >= goals.number) {
                points += 1 * exercise.exerciseInfo.points;
            }
        });
        const exerciseComplete = setsCompleted === exercise.sets.length ? 1 : 0;
        return { 
            pointsEarned: init.pointsEarned + points, 
            exercisesCompleted: init.exercisesCompleted + exerciseComplete, 
            setsCompleted: init.setsCompleted + setsCompleted 
        };
    }, { pointsEarned: 0, exercisesCompleted: 0, setsCompleted: 0 });
};

const StartStepTwo = props => {
    const { paused, startedWorkout: { exercises } } = props;
    const statusInfo = calculateStatusInfo(exercises);
    const { pointsEarned, exercisesCompleted, setsCompleted } = statusInfo;
    return (
        <View>
            <View style={styles.stepTwoContainerTop}>
                <View style={styles.topTextContainer}>
                    <Text style={styles.topTextLabel}>Workout: </Text>
                    <Text style={styles.topText}>{props.name}</Text>
                </View>
                <View style={styles.topTextContainer}>
                    <Text style={styles.topTextLabel}>Description: </Text>
                    <Text style={styles.topText}>{props.description}</Text>
                </View>
                <View style={styles.statusContainer}>
                    <Text style={styles.topTextLabel}>Status: </Text>
                    <View style={styles.timerContainer}>
                        <Text style={styles.topText}>-elapsed time </Text>
                        <Timer />
                    </View>
                    <Text style={styles.topText}>-{pointsEarned} points earned</Text>
                    <Text style={styles.topText}>-{setsCompleted} sets completed</Text>
                    <Text style={styles.topText}>-{exercisesCompleted} exercises completed</Text>
                </View>
            </View>
            <View style={styles.listLabel}>
                <Text style={styles.listLabelText}>Exercise Name</Text>
                <Text style={styles.listLabelText}>Points</Text>
                <Text style={styles.listLabelText}>Sets</Text>
            </View>
            <View style={styles.stepTwoContainer}>
                <ScrollView keyboardShouldPersistTaps="always">
                    {props.renderExercises()}
                </ScrollView>
            </View>
            {paused.isPaused === false ? (
            <Button 
                title={"PAUSE"}
                onPress={props.pause}
                backgroundColor={colors.secondary.light}
            />
            ) : (
            <View>
                <Button 
                    title={"RESUME"}
                    onPress={props.resume}
                    backgroundColor={colors.secondary.medium}
                />
                <Button 
                    title={"FINISH WORKOUT"}
                    onPress={props.finish}
                    backgroundColor={colors.primary.medium}
                />
            </View>
            )}
        </View>  
    );
};

const styles = StyleSheet.create({
    stepTwoContainerTop: {
        marginLeft: SCREEN_WIDTH * 0.036,
        width: SCREEN_WIDTH * 0.928,
        marginVertical: 10
    },
    stepTwoContainer: {
        borderWidth: 1,
        borderColor: colors.border.light,
        marginLeft: SCREEN_WIDTH * 0.036,
        width: SCREEN_WIDTH * 0.928,
        maxHeight: SCREEN_HEIGHT * 0.4
    },
    topText: {
        fontSize: 16
    },
    topTextContainer: {
         marginVertical: 3,
         flexDirection: 'row'
    },
    topTextLabel: {
        fontWeight: 'bold',
        fontSize: 16
    },
    statusContainer: {
        flexDirection: 'column'
    },
    listLabel: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border.light,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: SCREEN_HEIGHT * 0.07,
        backgroundColor: colors.secondary.dark,
        marginHorizontal: SCREEN_WIDTH * 0.036
    },
    listLabelText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.background.white
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export { StartStepTwo };

