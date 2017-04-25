import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import EditStepOne from '../foundation/editWorkout/EditStepOne';
import EditStepZero from '../foundation/editWorkout/EditStepZero';
import EditStepTwo from '../foundation/editWorkout/EditStepTwo';
import ListTitle from '../foundation/listTitle';
import SmallList from '../foundation/smallListItem';
import * as actions from '../../actions';
import * as types from '../../actions/types';

const createInfoText = exercise => {
    return Object.keys(exercise).reduce((initial, current) => {
            const first = current.substr(0, 1);
            if (first !== '_') {
                const label = first.toUpperCase() + current.substr(1);
                initial = [...initial, { label, text: exercise[current]}]
            }
        return initial;
    }, [])
};

class _EditWorkout extends Component {
    constructor(props) {
        super(props);
        this.props.fetchExercises();
    }

    componentWillReceiveProps(nextProps) {
        const checkOne = nextProps.edit_workouts.addExercisesPopulated.length !== this.props.edit_workouts.addExercisesPopulated.length;
        
        if (checkOne && this.props.edit_workouts.editStep === 2) {
            const { addExercisesPopulated, selectedWorkout, deleteExercises } = nextProps.edit_workouts;
            const workoutInfo = {newExercises: addExercisesPopulated, currentWorkout: selectedWorkout, deleteExercises};
            this.props.switchToCreateWorkout(workoutInfo);
            this.props.navigation.navigate('workoutCreate');
        }
    }

    incrementStepAdd = () => { this.props.getEditAddExercises() }
    onSelectDelete = id => {this.props.exerciseToDelete(id)}
    onSelectAdd = id => {this.props.exerciseToAdd(id)}
    renderWorkouts = () => this.props.workouts.map(workout => <Text>{workout.name}</Text>)
    rightIcon = () => <Icon name="chevron-right" size={40} />
    onChoiceButtonPress = choice => this.props.exerciseEditOption(choice);

    onBackListVisible = () => {
        this.props.workoutInfoVisibility('')
        this.props.navigation.navigate('setup');
    }

    moveEditStep = direction => {
        direction ? this.props.incrementEditStep() : this.props.decrementEditStep();
    }

    rightIconDelete = id => {
        const checked = this.props.edit_workouts.deleteExercises.filter(exercise => exercise === id).length;
        const iconProp = checked ? 'square' : 'square-o';
        return <Icon size={40} name={iconProp} type='font-awesome' />
    }

    rightIconAdd = id => {
        const checked = this.props.edit_workouts.addExercises.filter(exercise => exercise === id).length;
        const iconProp = checked ? 'square' : 'square-o';
        return <Icon size={40} name={iconProp} type='font-awesome' />
    }

    renderExercisesList = () => {
        const selectedExercises = this.props.edit_workouts.selectedWorkout.exercises;
        const { exercises, exerciseEditOption } = this.props.edit_workouts;
        const add = exerciseEditOption === 'left';
        const exerciseList = add ? exercises.filter(e => !selectedExercises.some(_e => e._id === _e.exerciseInfo._id)) : selectedExercises;
        const onSelect = add ? this.onSelectAdd : this.onSelectDelete;
        const rightIcon = add ? this.rightIconAdd : this.rightIconDelete;
        return exerciseList.map(exercise => {
                const infoTextArg = add ? exercise : exercise.exerciseInfo;
                const infoText = createInfoText(infoTextArg);
                return <SmallList
                            key={exercise._id}
                            onSelect={onSelect}
                            id={exercise._id}
                            onMoreInfo={this.props.toggleDeleteInfo}
                            moreInfoId={this.props.edit_workouts.deleteMoreInfoId}
                            rightIcon={rightIcon}
                            {...infoTextArg}
                            infoText={infoText}
                        />
            });

    }

    render() {
        const { editStep, listVisibility, selectedWorkout: { name, description, exercises } } = this.props.edit_workouts;
        return (
            <View>
                <ListTitle title='EDIT WORKOUT' />
                {editStep === 0 &&
                <EditStepZero
                    rightIcon={this.rightIcon}
                    onBackListVisible={this.onBackListVisible}
                />
                }
                {editStep === 1 &&
                <EditStepOne
                    name={name} 
                    description={description} 
                    moveEditStep={this.moveEditStep}
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
                />
                }
                {editStep === 3 &&
                    <View>
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { edit_workouts, setup_workouts } = state;
    return {
        edit_workouts, setup_workouts
    }
}

const EditWorkout = connect(mapStateToProps, actions)(_EditWorkout);
export { EditWorkout };