import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, UIManager, LayoutAnimation, Dimensions, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import EditStepOne from '../foundation/editWorkout/EditStepOne';
import EditStepZero from '../foundation/editWorkout/EditStepZero';
import EditStepTwo from '../foundation/editWorkout/EditStepTwo';
import ListTitle from '../foundation/listTitle';
import SmallList from '../foundation/smallListItem';
import * as actions from '../../actions';
import colors from '../../colors';

let SCREEN_HEIGHT = Dimensions.get("window").height;

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

const createInfoText = exercise => {
    if (!exercise) { 
        console.log(exercise);
        return;
    }
    return Object.keys(exercise).reduce((initial, current) => {
            const first = current.substr(0, 1);
            if (first !== '_') {
                const label = first.toUpperCase() + current.substr(1);
                initial = [...initial, { label, text: exercise[current] }];
            }
        return initial;
    }, []);
};

class _EditWorkout extends Component {

    componentDidMount() {
        const { user: { id } } = this.props.auth;
        this.props.fetchExercises(id);
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.easeInEaseOut();
    }

    componentWillReceiveProps(nextProps) {      
        if (nextProps.edit_workouts.editStep === 3 && this.props.edit_workouts.editStep === 2) {
            const { addExercisesPopulated, selectedWorkout, deleteExercises } = nextProps.edit_workouts;
            const workoutInfo = { newExercises: addExercisesPopulated, currentWorkout: selectedWorkout, deleteExercises };
            this.props.switchToCreateWorkout(workoutInfo);
            this.props.navigation.navigate('workoutCreate');
        }
    }

    
    onSelectDelete = id => { this.props.exerciseToDelete(id); };
    onSelectAdd = id => { this.props.exerciseToAdd(id); };
    renderWorkouts = () => this.props.workouts.map(workout => <Text>{workout.name}</Text>)
    rightIcon = () => <Icon name="chevron-right" size={40} />
    onChoiceButtonPress = choice => this.props.exerciseEditOption(choice);
    changeText = (type, text) => this.props.createWorkoutText({ type, text });

    incrementStepAdd = () => { 
        const { selectedWorkout: { exercises }, addExercises } = this.props.edit_workouts;
        if (exercises.length === 0 && addExercises.length === 0) {
            return this.props.workoutEditError('You must have at least one exercise.');
        }
        this.props.workoutEditError('');
        this.props.getEditAddExercises();
    }

    onBackListVisible = () => {
        this.props.onBackDeleteWorkouts();
        this.props.workoutInfoVisibility('');
        this.props.navigation.navigate('setup');
    }

    moveEditStep = direction => {
        this.props.workoutEditError('');
        direction ? this.props.incrementEditStep() : this.props.decrementEditStep();
    }

    moveEditStepOne = direction => {
        if (direction) {
            const { selectedWorkout } = this.props.edit_workouts;
            const validate = validateWorkoutForm(selectedWorkout);
            if (!validate.complete) {
                return this.props.workoutEditError(validate.errorMessage);
            }
            this.props.workoutEditError('');
            this.props.incrementEditStep();
        } else {
            this.props.workoutEditError('');
            this.props.decrementEditStep();
        }
    }

    rightIconDelete = id => {
        const checked = this.props.edit_workouts.deleteExercises.filter(exercise => exercise === id).length;
        const iconProp = checked ? 'check-box' : 'check-box-outline-blank';
        return <Icon size={40} name={iconProp} />;
    }

    rightIconAdd = id => {
        const checked = this.props.edit_workouts.addExercises.filter(exercise => exercise === id).length;
        const iconProp = checked ? 'check-box' : 'check-box-outline-blank';
        return <Icon size={40} name={iconProp} />;
    }

    renderExercisesList = () => {
        const selectedExercises = this.props.edit_workouts.selectedWorkout.exercises;
        const { exercises, exerciseEditOption } = this.props.edit_workouts;
        const add = exerciseEditOption === 'left';
        let addExercises = {};
        if (add) {
            addExercises = exercises.filter(e => {
                return !selectedExercises.some(_e => {
                    if (_e.exerciseInfo) {
                        return e._id === _e.exerciseInfo._id;
                    }
                    });
                }
            );
        }
        const exerciseList = add ? addExercises : selectedExercises;
        const onSelect = add ? this.onSelectAdd : this.onSelectDelete;
        const rightIcon = add ? this.rightIconAdd : this.rightIconDelete;
        if (exerciseList.length === 0) {
            const message = add ? 'No more exercises to add.' : 'No more exercises to delete';
            return (
                    <View style={styles.blankContainer}>
                        <Text style={styles.blankText}>{message}</Text>
                    </View>
                    );
        }
        return exerciseList.map((exercise) => {
            const infoTextArg = add ? exercise : exercise.exerciseInfo;
            const infoText = createInfoText(infoTextArg);
            return (
                    <SmallList
                        key={exercise._id}
                        onSelect={onSelect}
                        id={exercise._id}
                        onMoreInfo={this.props.toggleDeleteInfo}
                        moreInfoId={this.props.edit_workouts.deleteMoreInfoId}
                        rightIcon={rightIcon}
                        {...infoTextArg}
                        infoText={infoText}
                    />);
        });
    };

    render() {
        const { errorMessage, editStep, selectedWorkout: { name, description } } = this.props.edit_workouts;
        return (
            <View>
                <ListTitle title='EDIT WORKOUT' />
                {editStep === 0 &&
                <EditStepZero
                    rightIcon={this.rightIcon}
                    onBackListVisible={this.onBackListVisible}
                    title='Choose a workout to edit.'
                />
                }
                {editStep === 1 &&
                <EditStepOne
                    name={name} 
                    description={description} 
                    moveEditStep={this.moveEditStepOne}
                    changeText={this.changeText}
                    errorMessage={errorMessage}
                />
                }
                {editStep === 2 &&
                <EditStepTwo
                    incrementStepAdd={this.incrementStepAdd}
                    exerciseEditOption={this.props.edit_workouts.exerciseEditOption}
                    onChoiceButtonPress={this.onChoiceButtonPress}
                    removeExercisesFromWorkout={this.props.removeExercisesFromWorkout}
                    moveEditStep={this.moveEditStep}
                    renderExercisesList={this.renderExercisesList}
                    errorMessage={errorMessage}
                />
                }
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { edit_workouts, setup_workouts, auth } = state;
    return {
        edit_workouts, setup_workouts, auth
    };
};

const styles = StyleSheet.create({
    blankContainer: { 
        height: SCREEN_HEIGHT * 0.12, 
        backgroundColor: colors.background.light, 
        borderWidth: 1, 
        borderColor: colors.border.light,
        justifyContent: 'center',
        alignItems: 'center'
    },
    blankText: {
        fontSize: 20
    }
});

const EditWorkout = connect(mapStateToProps, actions)(_EditWorkout);
export { EditWorkout };
