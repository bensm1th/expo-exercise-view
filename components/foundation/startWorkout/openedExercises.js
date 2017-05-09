import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../../colors';

let SCREEN_HEIGHT = Dimensions.get('window').height;

const calculatePointsEarned = sets => {
    let points = 0;
    sets.forEach(set => {
        const { goals, actual } = set;
        if (actual.weight >= goals.weight && actual.number >= goals.number) {
            points++;
        }
    });
    return points;
};


const OpenedExercises = props => (
    <View>
    {props.exercises.map(exercise => {
        const { openedExercise, finishedSets, paused: { isPaused } } = props;
        const { exerciseInfo: { points, name }, sets, _id } = exercise;
        const countFinished = sets.filter(set => finishedSets.some(id => id === set._id)).length;
        const addCheck = countFinished === sets.length;
        const totalPoints = points * sets.length;
        const pointsEarned = calculatePointsEarned(sets) * points;
        return (
            <View key={exercise._id}>
                <TouchableOpacity
                    onPress={() => {
                        if (isPaused) return;
                        props.openSets(exercise);
                    }}
                >
                    <View style={styles.startedExerciseContainer}>
                        <Text>{name}</Text>
                        <Text>{pointsEarned}/{totalPoints} pts</Text>
                        <Text>{countFinished}/{sets.length}</Text>
                        {addCheck &&
                            <Icon 
                                name="check"
                                type="font-awesome"
                                size={30}
                                color={colors.secondary.dark}
                            />    
                        }
                    </View>
                </TouchableOpacity>
                {openedExercise._id === _id && !isPaused &&
                    <View>
                    {props.renderOpenedSets(sets)}
                    </View>    
                }
            </View>
        );
    })
}
</View>);

const styles = StyleSheet.create({
    startedExerciseContainer: {
        borderBottomWidth: 1,
        borderBottomColor: colors.border.light,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: SCREEN_HEIGHT * 0.07,
        backgroundColor: colors.background.light
    }
});

export { OpenedExercises };
