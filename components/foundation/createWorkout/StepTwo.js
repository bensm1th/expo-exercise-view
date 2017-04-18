import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import ExercisesList from '../listViewExample';
import * as types from '../../../actions/types';

let SCREEN_HEIGHT = Dimensions.get("window").height;

class StepTwo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <View style={styles.directions}>
                    <Text style={styles.directionsText}>Step 2: Choose Exercises to add to your workout.</Text>
                </View>
                <View
                    style={styles.stepTwoList}
                >
                    <ExercisesList
                        rightIcon={this.props.rightIcon}
                        onSelect={this.props.onExerciseSelect}
                    />
                </View>
                <Button 
                    title='FORWARD'
                    onPress={() => {
                        this.props.fetchSelectedExercises();
                        this.props.incrementStep();
                    }}
                    backgroundColor='#8f9bff'
                />
                <Button 
                    title='BACK'
                    onPress={this.props.decrementStep}
                    backgroundColor='#0043cb'
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    directions: {
        height: SCREEN_HEIGHT * .08,
        justifyContent: 'center',
        alignItems: 'center'
    },
    directionsText: {
        fontSize: 20
    },
    stepTwoList: {
        height: SCREEN_HEIGHT * .5,
        marginBottom: SCREEN_HEIGHT * .035
    }
});

export default StepTwo;