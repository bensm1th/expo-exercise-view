import React from 'react';
import { Text, View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../../../colors';

let SCREEN_HEIGHT = Dimensions.get('window').height;
let SCREEN_WIDTH = Dimensions.get('window').width;

const StepFour = props => {
    const { name, description, title } = props.workoutInfo;
    const { buttonOne, buttonTwo } = props.buttons;
    const backgroundColor = props.backgroundColor ? props.backgroundColor : colors.background.white;
    return (
        <View style={{ backgroundColor }}>
            <View style={styles.directions}>
                <Text style={styles.directionsText}>{title}</Text>
            </View>
            <View style={styles.workoutTitle}>
                <Text style={styles.workoutTitleText}>{name}</Text>
                <Text style={styles.workoutDescriptionText}>{description}</Text>
            </View>
            <View style={styles.scrollViewContainer}>
                <ScrollView>
                    {props.renderFinalExercises()}
                </ScrollView>
            </View>
            <Button 
                title={buttonOne.text}
                onPress={buttonOne.onPress}
                backgroundColor={colors.secondary.light}
            />
            <Button 
                title={buttonTwo.text}
                onPress={buttonTwo.onPress}
                backgroundColor={colors.secondary.dark}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    directions: {
        height: SCREEN_HEIGHT * 0.08,
        justifyContent: 'center',
        alignItems: 'center'
    },
    directionsText: {
        fontSize: 20
    },
    scrollViewContainer: {
        height: SCREEN_HEIGHT * 0.5,
        marginBottom: 10
    },
    workoutTitleText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    workoutDescriptionText: {
        fontSize: 16
    },
    workoutTitle: {
        backgroundColor: colors.primary.light,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: SCREEN_WIDTH * 0.036,
        marginRight: SCREEN_WIDTH * 0.036
    }
});

export default StepFour;
