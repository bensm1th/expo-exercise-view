import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Dimensions, ListView, ScrollView } from 'react-native';
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements';
import ListTitle from '../foundation/listTitle';
import StepOne from '../foundation/createWorkout/StepOne';
import StepTwo from '../foundation/createWorkout/StepTwo';
import StepThree from '../foundation/createWorkout/StepThree';
import StepFour from '../foundation/createWorkout/StepFour';
import AddSetsListItem from '../foundation/createWorkout/AddSetsListItem'
import * as actions from '../../actions';
import * as types from '../../actions/types';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;

class _CreateWorkout extends Component {

    onBack = () => {
        this.props.navigation.navigate('setup');
    }

    incrementStep = () => {
        this.props.createWorkoutStepInc();
    }

    decrementStep = () => {
        this.props.createWorkoutStepDec();
    }

    changeText = (type, text) => {
        this.props.createWorkoutText({type, text});
    }

    fetchSelectedExercises = () => {
        const { exercises } = this.props.setup_workouts;
        this.props.fetchExercisesById(exercises);
    }

    rightIcon = (id) => {
        const checked = this.props.setup_workouts.exercises.filter(exercise => {
            return exercise === id;
        }).length;
        
        if (checked) {
            return (
                <Icon
                    size={40}
                    name='square'
                    type='font-awesome'
                />
            )
        }
        return (
            <Icon
                size={40}
                name='square-o'
                type='font-awesome'
            />
        )
    }

    onExerciseSelect = (id) => {
        this.props.toggleExerciseCheck(id);
    }

    renderSelectedExercises = () => {
        return (
            <View style={styles.setsListContainer}>
                <ListView
                    enableEmptySections
                    dataSource={this.props.listData}
                    renderRow={(exercise) => this.renderRow(exercise)}
                />
            </View>
        );
    }

    renderRow = exercise => {
        return (
            <AddSetsListItem
                {...exercise}
                changeSetTextMethod={this.changeSetTextMethod}
                deleteSetMethod={this.deleteSetMethod}
                addSet={this.addSet}
                saveSets={this.saveSets}
                {...this.props}
            />
        );
    }
    addSet = (id) => {
        //id is the _id of the exerciseInfo that the set is associated with
        this.props.addSetToExerciseModel(id);
    }
    deleteSetMethod = (exerciseId, setId) => {
        this.props.deleteSet({ exerciseId, setId });
    }
    saveSets = (exerciseId) => {
        this.props.toggleSetsView(exerciseId);
    }

    changeSetTextMethod = (text, type, id, exerciseId) => {
        this.props.changeSetText({ type, text, id, exerciseId });
    }

    renderSets = sets => {
        return sets.map((set, i) => {
            return (
                <View key={set.id}>
                    <Text>Set {i + 1}: </Text>
                    <Text>weight: {set.weight}</Text>
                    <Text>reps: {set.reps}</Text>
                </View>
            );
        });
    }

    renderFinalExercises = () => {
        const { populatedExercises } = this.props.setup_workouts;
        return populatedExercises.map((exercise, i) => {
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
    
    saveWorkoutMethod = () => {
        const { createForm, populatedExercises } = this.props.setup_workouts;
        this.props.saveWorkout({ createForm, exercises: populatedExercises });
        this.props.navigation.navigate('setup');
    }

    render() {
        const { createStep } = this.props.setup_workouts;
        return (
            <View style={styles.container}>
                <ListTitle title='CREATE WORKOUT' />
                {createStep === 1 &&
                <StepOne
                    changeText={this.changeText}
                    incrementStep={this.incrementStep}
                    onBack={this.onBack}
                    {...this.props.setup_workouts}
                />
                }
                {createStep === 2 &&
                <StepTwo
                    rightIcon={this.rightIcon}
                    onExerciseSelect={this.onExerciseSelect}
                    incrementStep={this.incrementStep}
                    decrementStep={this.decrementStep}
                    fetchSelectedExercises={this.fetchSelectedExercises}
                />
                }
                {createStep === 3 &&
                <StepThree
                    incrementStep={this.incrementStep}
                    decrementStep={this.decrementStep}
                    renderSelectedExercises={this.renderSelectedExercises}
                />
                }
                {createStep === 4 &&
                <StepFour
                    {...this.props}
                    saveWorkoutMethod={this.saveWorkoutMethod}
                    renderFinalExercises={this.renderFinalExercises}
                    decrementStep={this.decrementStep}
                />
                }
            </View>
        );
    }
}

mapStateToProps = state => {
    const { setup_workouts } = state;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
        setup_workouts,
        listData: ds.cloneWithRows(setup_workouts.populatedExercises)
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between'
    },
    exerciseContainer: {
        borderWidth: 1,
        borderColor: 'silver',
        marginLeft: SCREEN_WIDTH *.036,
        marginRight: SCREEN_WIDTH * .036
    },
    buttonContainer: {
        width: 200,
        flexDirection: 'row',
        marginTop: 20
    },
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
    },
    setsListContainer: {
        backgroundColor: '#f7f7f7',
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 3,
        height: SCREEN_HEIGHT *.5,
        marginBottom: SCREEN_HEIGHT * .05
    }
});

const CreateWorkout = connect(mapStateToProps, actions)(_CreateWorkout);
export { CreateWorkout };