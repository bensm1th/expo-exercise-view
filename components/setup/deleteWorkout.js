import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, UIManager, LayoutAnimation } from 'react-native';
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements';
import EditStepZero from '../foundation/editWorkout/EditStepZero';
import StepFour from '../foundation/createWorkout/StepFour';
import ListTitle from '../foundation/listTitle';
import * as actions from '../../actions';

let SCREEN_WIDTH = Dimensions.get("window").width;

class _DeleteWorkout extends Component {

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.easeInEaseOut();
    }

    onBackListVisible = () => {
        this.props.navigation.navigate('setup');
    }

    rightIcon = id => {
        return <Icon name="chevron-right" size={40} />
    }

    renderFinalExercises = () => {
        const { selectedWorkout: { exercises } } = this.props.edit_workouts;
        return exercises.map((exercise, i) => {
            const { name, description, type, points, _id } = exercise.exerciseInfo;
            return (
                <View key={_id} style={styles.exerciseContainer}>
                    <Text>Exercise {i + 1}: {name}</Text>
                    <Text>Description: {description}</Text>
                    <Text>Type: {type}</Text>
                    <Text>Points per set: {points}</Text>
                    {this.renderSets(exercise.sets)}
                </View>
            );
        });
    }

    renderSets = sets => {
        return sets.map((set, i) => {
            return (
                <View key={set._id}>
                    <Text>Set {i + 1}: </Text>
                    <Text>weight: {set.weight}</Text>
                    <Text>reps: {set.reps}</Text>
                </View>
            );
        });
    }

    deleteWorkout = () => {
        const { selectedWorkout } = this.props.edit_workouts;
        this.props.deleteWorkout(selectedWorkout._id);
    }

    onBack = () => {
        this.props.onBackDeleteWorkouts();
    }



    render() {
        const { name, description, exercises } = this.props.edit_workouts.selectedWorkout;
        const show = name === '';
        const buttons = {
            buttonOne: {
                text: 'DELETE',
                onPress: this.deleteWorkout
            },
            buttonTwo: {
                text: 'BACK',
                onPress: this.onBack
            }
        }
        return (
            <View>
                <ListTitle title="DELETE WORKOUTS" />
                {show ? (
                <EditStepZero 
                    rightIcon={this.rightIcon}
                    onBackListVisible={this.onBackListVisible}
                    title='Choose workouts to delete.'
                    parent='deleteWorkout'
                />
                ) : 
                (
                <StepFour
                    {...this.props}
                    saveWorkoutMethod={this.saveWorkoutMethod}
                    renderFinalExercises={this.renderFinalExercises}
                    decrementStep={this.decrementStep}
                    workoutInfo = {{ name, description, title: 'Do you want to delete this workout?'}}
                    buttons={buttons}
                    parent='deleteWorkout'
                />
                ) }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    exerciseContainer: {
        borderWidth: 1,
        borderColor: 'silver',
        marginLeft: SCREEN_WIDTH *.036,
        marginRight: SCREEN_WIDTH * .036
    }
});

const mapStateToProps = state => {
    const { delete_workouts, edit_workouts, setup_workouts } = state;
    return {
        delete_workouts, edit_workouts, setup_workouts
    }
}

const DeleteWorkout = connect(mapStateToProps, actions)(_DeleteWorkout)

export { DeleteWorkout };