import React from 'react';
import { Button } from 'react-native-elements';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import colors from '../../../colors';
import WorkoutList from './WorkoutListView';

let SCREEN_HEIGHT = Dimensions.get('window').height;
let SCREEN_WIDTH = Dimensions.get('window').width;

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
                buttonStyle={{ width: 100, marginLeft: SCREEN_WIDTH * 0.05 }}
                onPress={props.onBackListVisible}
                title='BACK'
                backgroundColor={colors.secondary.dark}
            />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        width: SCREEN_WIDTH * 0.9,
        marginLeft: SCREEN_WIDTH * 0.05,
        maxHeight: SCREEN_HEIGHT * 0.60,
        marginBottom: SCREEN_HEIGHT * 0.05,
        backgroundColor: colors.background.medium
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
});
