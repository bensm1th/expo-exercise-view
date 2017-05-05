import React from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Status from './Status';
import colors from '../../../colors';

let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREEN_HEIGHT = Dimensions.get('window').height;

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
                    <Text style={styles.topText}>{props.name}</Text>
                </View>
                <Status 
                    pointsEarned={pointsEarned}
                    setsCompleted={setsCompleted}
                    exercisesCompleted={exercisesCompleted}
                />
            </View>
            <View style={styles.listLabel}>
                <Text style={styles.listLabelText}>Exercise Name</Text>
                <Text style={styles.listLabelText}>Points</Text>
                <Text style={styles.listLabelText}>Sets</Text>
            </View>
            <View style={styles.stepTwoContainer}>
                <ScrollView keyboardShouldPersistTaps='always'>
                    {props.renderExercises()}
                </ScrollView>
            </View>
            {paused.isPaused === false &&
            <Button 
                title={'PAUSE'}
                onPress={props.pause}
                backgroundColor={colors.secondary.light}
            />
            }
            {paused.isPaused && 
            <Button 
                title={'RESUME'}
                onPress={props.resume}
                backgroundColor={colors.secondary.medium}
            />
            }
            {(paused.isPaused || exercisesCompleted === exercises.length) &&
            <Button 
                title={'FINISH WORKOUT'}
                onPress={props.finish}
                backgroundColor={colors.primary.medium}
            />
            }
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
        maxHeight: SCREEN_HEIGHT * 0.37
    },
    topText: {
        fontSize: 20,
        fontWeight: 'bold',
        letterSpacing: 3,
        color: colors.text.dark
    },
    topTextContainer: {
         marginVertical: 3,
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center'
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
});

export { StartStepTwo };

