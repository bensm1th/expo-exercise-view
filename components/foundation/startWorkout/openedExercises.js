import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

let SCREEN_WIDTH = Dimensions.get("window").width;
let SCREEN_HEIGHT = Dimensions.get("window").height;

const OpenedExercises = props => {
    
    return (
        <View>
        {props.exercises.map(exercise => {
            const { openedExercise } = props;
            const { exerciseInfo: { points, name }, sets, pointsEarned, _id } = exercise;
            const totalPoints = points * sets.length;
            return (
                <View key={exercise._id}>
                    <TouchableOpacity
                        onPress={() => props.openSets(exercise)}
                    >
                        <View style={styles.startedExerciseContainer}>
                            <Text>{name}</Text>
                            <Text>{pointsEarned}/{totalPoints} pts</Text>
                            <Text>0/{sets.length}</Text>
                        </View>
                    </TouchableOpacity>
                    {openedExercise._id === _id &&
                        <View>
                        {props.renderOpenedSets(sets)}
                        </View>    
                    }
                </View>
            );
        })
    }
    </View>)
}

const styles = StyleSheet.create({
    startedExerciseContainer: {
        borderBottomWidth: 1,
        borderBottomColor: 'silver',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: SCREEN_HEIGHT * .07,
        backgroundColor: '#f7f7f7'
    }
});

export default OpenedExercises;