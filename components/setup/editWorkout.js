import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const EditWorkout = (props) => {
    return (
        <View>
            <TouchableOpacity
                onPress={props.onPress}
            >
                <Text>Edit Workout</Text>
                <Text>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
}

export { EditWorkout };