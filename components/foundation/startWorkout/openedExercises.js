import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

let SCREEN_WIDTH = Dimensions.get("window").width;
let SCREEN_HEIGHT = Dimensions.get("window").height;

const OpenedExercises = props => {
    return (
        <View>
        {props.exercises.map(exercise => {
            const { openedExercise, finishedSets } = props;
            const { exerciseInfo: { points, name }, sets, pointsEarned, _id } = exercise;
            const countFinished = sets.filter(set => finishedSets.some(id => id === set._id)).length;
            const addCheck = countFinished === sets.length;
            const totalPoints = points * sets.length;
            return (
                <View key={exercise._id}>
                    <TouchableOpacity
                        onPress={() => props.openSets(exercise)}
                    >
                        <View style={styles.startedExerciseContainer}>
                            {addCheck &&
                                <Icon 
                                    name="check"
                                    type="font-awesome"
                                    size={40}
                                />    
                            }
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
        justifyContent: 'space-around',
        alignItems: 'center',
        height: SCREEN_HEIGHT * .07,
        backgroundColor: '#f7f7f7'
    }
});

export default OpenedExercises;