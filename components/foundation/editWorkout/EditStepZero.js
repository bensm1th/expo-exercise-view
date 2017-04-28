import React from 'react';
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements';
import { Text, View, Dimensions, StyleSheet } from 'react-native';

import WorkoutList from './WorkoutListView';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;

export default EditStepZero = props => {
    return (
        <View>
            <View style={styles.directions}>
                <Text style={styles.directionsText}>{props.title}</Text>
            </View>
            <View style={styles.listContainer}>
                <WorkoutList
                    rightIcon={props.rightIcon}
                    parent={props.parent}
                />
            </View>
            {props.parent !== 'start' &&
            <Button 
                buttonStyle={{ width: 100, marginLeft: SCREEN_WIDTH * .05}}
                onPress={props.onBackListVisible}
                title="BACK"
                backgroundColor="#0043cb"
            />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        width: SCREEN_WIDTH * .9,
        marginLeft: SCREEN_WIDTH * .05,
        height: SCREEN_HEIGHT *.60,
        marginBottom: SCREEN_HEIGHT * .05
    },
    directions: {
        marginTop: 15,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    directionsText: {
        fontSize: 20
    },
})