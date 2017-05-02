import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { FormLabel } from 'react-native-elements';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;

const renderSets = sets => {
    return sets.map((set, i) => {
        return (
            <View key={set._id} style={styles.setTextContainer}>
                <Text style={styles.setText}>Set {i + 1}: </Text>
                <Text style={styles.setText}>weight: {set.weight}</Text>
                <Text style={styles.setText}>reps: {set.reps}</Text>
            </View>
        );
    });
};

const FinalExercises = props => {
    const { index, name, description, type, points, sets } = props; 
    return (
        <View key={props._id} style={styles.exerciseContainer}>
            <View style={styles.textContainer}>
                <FormLabel>Exercise {index + 1}: </FormLabel>
                <Text style={styles.text}>{name}</Text>
                <FormLabel>Description: </FormLabel>
                <Text style={styles.text}>{description}</Text>
                <FormLabel>Type: </FormLabel>
                <Text style={styles.text}>{type}</Text>
                <FormLabel>Points per set: </FormLabel>
                <Text style={styles.text}>{points}</Text>
                <FormLabel>Sets: </FormLabel>
                {renderSets(props.sets)}
            </View>
        </View>);
};

export default FinalExercises;

const styles = StyleSheet.create({
      exerciseContainer: {
        borderWidth: 1,
        borderColor: 'silver',
        marginLeft: SCREEN_WIDTH * 0.036,
        marginRight: SCREEN_WIDTH * 0.036,
        backgroundColor: '#f7f7f7'
    },
    textContainer: {
        padding: 5
    },
    text: {
        fontSize: 14,
        marginHorizontal: 20,
        marginTop: 5
    },
    setText: {
        fontSize: 14,
    },
    setTextContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 5
    }
});

