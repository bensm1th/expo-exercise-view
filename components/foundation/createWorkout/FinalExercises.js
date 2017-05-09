import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { FormLabel } from 'react-native-elements';
import { v4 } from 'uuid';
import colors from '../../../colors';

let SCREEN_HEIGHT = Dimensions.get('window').height;
let SCREEN_WIDTH = Dimensions.get('window').width;

const renderSets = sets => {
    return sets.map((set, i) => {
        return (
            <View key={v4()} style={styles.setTextContainer}>
                <Text style={styles.setText}>Set {i + 1}: </Text>
                <Text style={styles.setText}>weight: {set.weight} </Text>
                <Text style={styles.setText}>reps: {set.reps}</Text>
            </View>
        );
    });
};

const renderCompletedSets = sets => {
    return sets.map((set, i) => {
        return (
            <View key={v4()} style={styles.setTextContainer}>
                <Text style={styles.setText}>Set {i + 1}: </Text>
                <View style={styles.setsContainer}>
                    <View style={styles.setContainer}>
                    <Text style={styles.setText}>goal weight: {set.goals.weight} </Text>
                    <Text style={styles.setText}>goal reps: {set.goals.number}</Text>
                </View>
                <View style={styles.setContainer}>
                    <Text style={styles.setText}>actual weight: {set.actual.weight} </Text>
                    <Text style={styles.setText}>actual reps: {set.actual.number}</Text>
                </View>
                </View>
            </View>
        );
    });
};


const FinalExercises = props => {
    const { index, name, description, type, points, sets } = props;
    return (
        <View key={v4()} style={styles.exerciseContainer}>
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
                {props.parent === 'stats' ? (
                    <View>
                        {renderCompletedSets(sets)}
                    </View>) : (
                    <View>
                        {renderSets(sets)}
                    </View>)}
                
            </View>
        </View>);
};

export default FinalExercises;

const styles = StyleSheet.create({
    setsContainer: {
        flexDirection: 'column'
    },
    setContainer: {
        flexDirection: 'row'
    },
    exerciseContainer: {
        backgroundColor: colors.background.light,
        borderColor: colors.border.light,
        borderBottomWidth: 1
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

