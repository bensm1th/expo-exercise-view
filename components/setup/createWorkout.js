import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Dimensions, 
    ListView, ScrollView, UIManager, LayoutAnimation } from 'react-native';
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
    constructor(props) {
        super(props);
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.easeInEaseOut();
    }

    onBack = () => this.props.navigation.navigate('setup');
    incrementStep = () => this.props.createWorkoutStepInc();
    decrementStep = () => this.props.createWorkoutStepDec();
    changeText = (type, text) => this.props.createWorkoutText({type, text});
    fetchSelectedExercises = () => this.props.fetchExercisesById(this.props.setup_workouts.exercises);
    addSet = exerciseInfoId => this.props.addSetToExerciseModel(exerciseInfoId);
    deleteSetMethod = (exerciseId, setId) => this.props.deleteSet({ exerciseId, setId });
    saveSets = exerciseId => this.props.toggleSetsView(exerciseId);
    changeSetTextMethod = (text, type, id, exerciseId) => this.props.changeSetText({ type, text, id, exerciseId });
    onExerciseSelect = id => this.props.toggleExerciseCheck(id);
    
    rightIcon = id => {
        const checked = this.props.setup_workouts.exercises.filter(exercise => exercise === id).length;
        const iconProp = checked ? 'check-box' : 'check-box-outline-blank';
        return <Icon size={40} name={iconProp} />
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

    navigateBack = () => {
        this.props.setEditStep(2);
        this.props.workoutCreateStepSet(1);
        this.props.navigation.navigate('workoutEdit');
    }
    
    render() {
        const { createStep, editWorkout, createForm: { name, description} } = this.props.setup_workouts;
        const title = editWorkout ? 'EDIT WORKOUT' : 'CREATE WORKOUT';
        const onBackOption = editWorkout ? this.navigateBack : this.decrementStep;
        const buttons = {
            buttonOne: {
                text: 'SAVE',
                onPress: this.saveWorkoutMethod
            },
            buttonTwo: {
                text: 'BACK',
                onPress: this.decrementStep
            }
        }
        return (
            <View style={styles.container}>
                <ListTitle title={title} />
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
                    decrementStep={onBackOption}
                    renderSelectedExercises={this.renderSelectedExercises}
                    editWorkout={editWorkout}
                />
                }
                {createStep === 4 &&
                <StepFour
                    {...this.props}
                    buttons={buttons}
                    renderFinalExercises={this.renderFinalExercises}
                    workoutInfo = {{ name, description, title: 'Step 4: View and save your workout.'}}
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