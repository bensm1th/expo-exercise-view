import React from 'react';
import { Text, View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

let SCREEN_HEIGHT = Dimensions.get('window').height;
let SCREEN_WIDTH = Dimensions.get('window').width;

const StepFour = props => {
    const { name, description, title } = props.workoutInfo;
    const { buttonOne, buttonTwo } = props.buttons;
    const backgroundColor = props.backgroundColor ? props.backgroundColor : '#fff';
    console.log(backgroundColor);
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
                backgroundColor='#8f9bff'
            />
            <Button 
                title={buttonTwo.text}
                onPress={buttonTwo.onPress}
                backgroundColor='#0043cb'
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
        backgroundColor: '#ff795b',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: SCREEN_WIDTH * 0.036,
        marginRight: SCREEN_WIDTH * 0.036
    }
});

export default StepFour;
