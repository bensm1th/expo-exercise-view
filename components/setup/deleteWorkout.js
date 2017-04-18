import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const DeleteWorkout = (props) => {
    return (
        <View>
            <TouchableOpacity
                onPress={props.onPress}
            >   
                <Text>Delete Workout</Text>
                <Text>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
}

export { DeleteWorkout };