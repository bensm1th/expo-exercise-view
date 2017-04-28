import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

let SCREEN_WIDTH = Dimensions.get("window").width;
let SCREEN_HEIGHT = Dimensions.get("window").height;

export default FinalExercises = props => {
     return ( 
        <View>
        {props.exercises.map((exercise, i) => {
                const { name, description, type, points, _id } = exercise.exerciseInfo;
                return (
                    <View key={_id} style={styles.exerciseContainer}>
                        <Text>Exercise {i + 1}: {name}</Text>
                        <Text>Description: {description}</Text>
                        <Text>Type: {type}</Text>
                        <Text>Points per set: {points}</Text>
                        {props.renderSets(exercise.sets)}
                    </View>
                );
            })}
        </View>
     );
}

const styles = StyleSheet.create({
     exerciseContainer: {
        borderWidth: 1,
        borderColor: 'silver',
        marginLeft: SCREEN_WIDTH *.036,
        marginRight: SCREEN_WIDTH * .036
    }
})