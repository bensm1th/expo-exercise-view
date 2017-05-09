import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Dimensions, 
    ListView, UIManager, LayoutAnimation } from 'react-native';
import { v4 } from 'uuid';
import { Icon } from 'react-native-elements';
import ListTitle from '../foundation/listTitle';
import FinalExercises from '../foundation/createWorkout/FinalExercises';
import StepOne from '../foundation/createWorkout/StepOne';
import StepTwo from '../foundation/createWorkout/StepTwo';
import StepThree from '../foundation/createWorkout/StepThree';
import StepFour from '../foundation/createWorkout/StepFour';
import AddSetsListItem from '../foundation/createWorkout/AddSetsListItem';
import * as actions from '../../actions';
import colors from '../../colors';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;

const validateWorkoutForm = formProps => {
    const { name, description } = formProps;
    let errorMessage = '';
    let countErrors = 0;
    if (name.length === 0) {
        countErrors++;
        errorMessage += 'Workout name required. ';
    }
    if (description.length === 0) {
        countErrors++;
        errorMessage += 'Description required. ';
    }
    if (countErrors === 0) {
        return { complete: true, errorMessage };
    }
    if (countErrors > 0) {
        return { complete: false, errorMessage };
    }
};

class _CreateWorkout extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.easeInEaseOut();
    }

    fetchSelectedExercises = () => this.props.fetchExercisesById(this.props.setup_workouts.exercises);
    addSet = exerciseInfoId => this.props.addSetToExerciseModel(exerciseInfoId);
    deleteSetMethod = (exerciseId, setId) => this.props.deleteSet({ exerciseId, setId });
    saveSets = exerciseId => this.props.toggleSetsView(exerciseId);
    changeSetTextMethod = (text, type, id, exerciseId) => this.props.changeSetText({ type, text, id, exerciseId });
    onExerciseSelect = id => this.props.toggleExerciseCheck(id);

    decrementStep = () => {
        this.props.workoutEditError('');
        this.props.workoutCreateError('');
        this.props.createWorkoutStepDec();
    };

    onBack = () => {
        this.props.workoutCreateError('');
        this.props.clearWorkoutCreate();
        this.props.navigation.navigate('setup');
    };

    changeText = (type, text) => this.props.createWorkoutText({ type, text });

    incrementStep = () => {
        this.props.workoutCreateError('');
        this.props.createWorkoutStepInc();
    };

    incrementStepThree = () => {
        const allSetsSaved = this.props.setup_workouts.populatedExercises.every(exercise => {
            // console.log('--- increment stepThree -----');
            // console.log(exercise);
            return exercise.sets.every(set => set.weight.length && set.reps.length) && exercise.sets.length;
            //return exercise.setsSaved === true;
        });
        if (!allSetsSaved) {
            return this.props.workoutCreateError('Add at least one set to each exercise.');
        }
        this.props.workoutCreateError('');
        this.props.createWorkoutStepInc();
    };

    incrementStepTwo = () => {
        if (this.props.setup_workouts.exercises.length === 0) {
            return this.props.workoutCreateError('You must choose at least one exercise.');
        }
        this.props.workoutCreateError('');
        this.props.createWorkoutStepInc();
    };

    incrementStepOne = () => {
        const { createForm } = this.props.setup_workouts;
        const validate = validateWorkoutForm(createForm);
        if (!validate.complete) {
            return this.props.workoutCreateError(validate.errorMessage);
        }
        this.props.workoutCreateError('');
        this.props.createWorkoutStepInc();
    };
    
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

    renderFinalExercises = () => {
        const { populatedExercises } = this.props.setup_workouts;
        return populatedExercises.map((exercise, i) => {
            return (
                <FinalExercises 
                    key={v4()} 
                    {...exercise.exerciseInfo} 
                    index={i} 
                    sets={exercise.sets} 
                />);
        });
    }
    
    saveWorkoutMethod = () => {
        const { createForm, populatedExercises } = this.props.setup_workouts;
        const { user: { id } } = this.props.auth;
        this.props.saveWorkout({ createForm, exercises: populatedExercises }, id);
        this.props.navigation.navigate('setup');
    }

    navigateBack = () => {
        this.props.workoutCreateError('');
        this.props.workoutEditError('');
        this.props.setEditStep(2);
        this.props.workoutCreateStepSet(1);
        this.props.navigation.navigate('workoutEdit');
    }

    onCancel = () => {
        this.props.cancelWorkoutCreate();
        this.props.navigation.navigate('setup');
    }
    
    render() {
        const { errorMessage, createStep, editWorkout, createForm: { name, description } } = this.props.setup_workouts;
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
        };
        return (
            <View style={styles.container}>
                <ListTitle title={title} />
                {createStep === 1 &&
                <StepOne
                    changeText={this.changeText}
                    incrementStep={this.incrementStepOne}
                    onBack={this.onBack}
                    onCancel={this.onCancel}
                    {...this.props.setup_workouts}
                />
                }
                {createStep === 2 &&
                <StepTwo
                    rightIcon={this.rightIcon}
                    onExerciseSelect={this.onExerciseSelect}
                    incrementStep={this.incrementStepTwo}
                    decrementStep={this.decrementStep}
                    fetchSelectedExercises={this.fetchSelectedExercises}
                    errorMessage={errorMessage}
                    onCancel={this.onCancel}
                />
                }
                {createStep === 3 &&
                <StepThree
                    incrementStep={this.incrementStepThree}
                    decrementStep={onBackOption}
                    renderSelectedExercises={this.renderSelectedExercises}
                    editWorkout={editWorkout}
                    errorMessage={errorMessage}
                    onCancel={this.onCancel}
                />
                }
                {createStep === 4 &&
                <StepFour
                    {...this.props}
                    buttons={buttons}
                    renderFinalExercises={this.renderFinalExercises}
                    workoutInfo={{ name, description, title: 'Step 4: View and save your workout.' }}
                    onCancel={this.onCancel}
                    backgroundColor={colors.background.light}
                />
                }
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { setup_workouts, auth } = state;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return {
        setup_workouts, 
        auth,
        listData: ds.cloneWithRows(setup_workouts.populatedExercises)
    };
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
    },
    setsListContainer: {
        backgroundColor: colors.background.medium,
        maxHeight: SCREEN_HEIGHT * 0.5,
        marginBottom: SCREEN_HEIGHT * 0.02,
        marginHorizontal: SCREEN_WIDTH * 0.05
    }
});

const CreateWorkout = connect(mapStateToProps, actions)(_CreateWorkout);
export { CreateWorkout };
