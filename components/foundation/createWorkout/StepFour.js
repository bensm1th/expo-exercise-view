import React from 'react';
import { Text, View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../../../colors';

let SCREEN_HEIGHT = Dimensions.get('window').height;
let SCREEN_WIDTH = Dimensions.get('window').width;

const StepFour = props => {
    const { name, description, title } = props.workoutInfo;
    const { buttonOne, buttonTwo } = props.buttons;
    return (
        <View style={styles.container}>
            <View style={styles.directions}>
                <Text style={styles.directionsText}>{title}</Text>
            </View>
            <View style={styles.workoutTitle}>
                <Text style={styles.workoutTitleText}>{name}</Text>
                <Text style={styles.workoutDescriptionText}>{description}</Text>
                {props.parent === 'stats' && 
                    <Text>{props.pointsEarned} points earned</Text>
                }
            </View>
            <View style={styles.scrollViewContainer}>
                <ScrollView>
                    {props.renderFinalExercises()}
                </ScrollView>
            </View>
            {props.parent !== 'stats' ? (
            <View style={styles.buttonContainer}>
                <Button 
                    buttonStyle={styles.buttonStyle}
                    title={buttonOne.text}
                    onPress={buttonOne.onPress}
                    backgroundColor={colors.secondary.light}
                />
                <Button 
                    buttonStyle={styles.buttonStyle}
                    title={buttonTwo.text}
                    onPress={buttonTwo.onPress}
                    backgroundColor={colors.secondary.dark}
                />
                <Button 
                    buttonStyle={styles.buttonStyle}
                    title='CANCEL'
                    onPress={props.onCancel}
                    backgroundColor={colors.primary.dark}
                />
            </View>) : (
            <View style={styles.buttonContainer}>
                <Button 
                    buttonStyle={styles.buttonStyle}
                    title='BACK'
                    onPress={props.onBack}
                    backgroundColor={colors.primary.dark}
                />
            </View>   
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        width: 110,
        height: 50,
        marginTop: 10,
        marginLeft: 0,
        marginRight: 0
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginHorizontal: SCREEN_WIDTH * 0.05
    },
    directions: {
        height: SCREEN_HEIGHT * 0.08,
        justifyContent: 'center',
        alignItems: 'center'
    },
    directionsText: {
        fontSize: 20
    },
    scrollViewContainer: {
        maxHeight: SCREEN_HEIGHT * 0.5,
        borderColor: colors.border.light,
        borderWidth: 1,
        marginHorizontal: SCREEN_WIDTH * 0.05
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
        marginHorizontal: SCREEN_WIDTH * 0.05,
    },
    container: {
        height: SCREEN_HEIGHT,
        backgroundColor: colors.background.medium
    }
});

export default StepFour;
