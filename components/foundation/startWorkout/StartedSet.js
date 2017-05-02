import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const StartedSet = props => {
    return (
        <View>
            {props.sets.map((set, i) => {
                return (
                    <View key={set._id} style={styles.setTextContainer}>
                        <Text style={styles.setText}>Set {i + 1}: </Text>
                        <Text style={styles.setText}>weight: {set.goals.weight} </Text>
                        <Text style={styles.setText}>reps: {set.goals.number}</Text>
                    </View>
                );
            })}
    </View>);
};

const styles = StyleSheet.create({
    setText: {
        fontSize: 14,
    },
    setTextContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 5
    }
});

export { StartedSet };
