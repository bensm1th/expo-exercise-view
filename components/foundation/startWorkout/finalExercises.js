import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { FormLabel } from 'react-native-elements';
import colors from '../../../colors';

let SCREEN_WIDTH = Dimensions.get("window").width;
let SCREEN_HEIGHT = Dimensions.get("window").height;

const FinalExercises = props => {
     return ( 
        <View>
        {props.exercises.map((exercise, i) => {
                const { name, description, type, points, _id } = exercise.exerciseInfo;
                return (
                    <View key={_id} style={styles.exerciseContainer}>
                        <View style={styles.textContainer}>
                            <FormLabel>Exercise {i + 1}: </FormLabel>
                            <Text style={styles.text}>{name}</Text>
                            <FormLabel>Description: </FormLabel>
                            <Text style={styles.text}>{description}</Text>
                            <FormLabel>Type: </FormLabel>
                            <Text style={styles.text}>{type}</Text>
                            <FormLabel>Points per set: </FormLabel>
                            <Text style={styles.text}>{points}</Text>
                            <FormLabel>Sets: </FormLabel>
                            {props.renderSets(exercise.sets)}
                        </View>
                    </View>
                );
            })}
        </View>
     );
};

const styles = StyleSheet.create({
     exerciseContainer: {
        borderWidth: 1,
        borderColor: colors.border.light,
        backgroundColor: colors.background.white
    },
    textContainer: {
        padding: 5
    },
    text: {
        fontSize: 14,
        marginHorizontal: 20,
        marginTop: 5
    }
});

export { FinalExercises };
