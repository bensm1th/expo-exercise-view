import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet, ListView, ScrollView } from 'react-native';
import ListTitle from '../foundation/listTitle';
import SmallList from '../foundation/smallListItem';
import WorkoutList from '../foundation/editWorkout/WorkoutListView';
import ChoiceButton from '../foundation/choiceButton';
import * as actions from '../../actions';
import * as types from '../../actions/types';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;
let headerHeight = SCREEN_HEIGHT * .1;
let choiceHeight = SCREEN_HEIGHT * .15;

class _EditWorkout extends Component {
    constructor(props) {
        super(props);
        this.props.fetchExercises();
    }

    onBackListVisible = () => {
        this.props.workoutInfoVisibility('')
        this.props.navigation.navigate('setup');
    }

    renderWorkouts = () => {
        return this.props.workouts.map(workout => {
            return <Text>{workout.name}</Text>
        })
    }

    rightIcon = () => {
        return <Icon name="chevron-right" size={40} />
    }

    moveEditStep = direction => {
        direction ? this.props.incrementEditStep() : this.props.decrementEditStep();
    }

    onChoiceButtonPress = choice => {
        this.props.exerciseEditOption(choice);
    }

    rightIconTwo = id => {
        const checked = this.props.edit_workouts.deleteExercises.filter(exercise => exercise === id).length;
        const iconProp = checked ? 'square' : 'square-o';
        return <Icon size={40} name={iconProp} type='font-awesome' />
    }

    onSelect = id => {
        this.props.exerciseToDelete(id);
    }

    renderExercisesList = () => {
        const selectedExercises = this.props.edit_workouts.selectedWorkout.exercises;
        const { exercises, exerciseEditOption } = this.props.edit_workouts;

        if (exerciseEditOption === 'left') {
            const unselectedExercises = exercises.filter(e => !selectedExercises.filter(_e => e._id === _e.exerciseInfo._id).length);
            return unselectedExercises.map(filtered_exercise => {
                return <SmallList
                            key={filtered_exercise._id}
                            moreIcon={require('../../images/circleMore.png')}
                            lessIcon={require('../../images/lessCircle.png')}
                            onSelect={this.onSelect}
                            id={filtered_exercise._id}
                            onMoreInfo={this.props.toggleDeleteInfo}
                            moreInfoId={this.props.edit_workouts.deleteMoreInfoId}
                            rightIcon={this.rightIconTwo}
                            {...filtered_exercise}
                        />
            });
        } else {
            return selectedExercises.map(exercise => {
                return <SmallList
                            key={exercise._id}
                            moreIcon={require('../../images/circleMore.png')}
                            lessIcon={require('../../images/lessCircle.png')}
                            onSelect={this.onSelect}
                            id={exercise._id}
                            onMoreInfo={this.props.toggleDeleteInfo}
                            moreInfoId={this.props.edit_workouts.deleteMoreInfoId}
                            rightIcon={this.rightIconTwo}
                            {...exercise.exerciseInfo}
                        />
            });
        }
    }

    render() {
        const { editStep, listVisibility, selectedWorkout: { name, description, exercises } } = this.props.edit_workouts;
        return (
            <View>
            <ListTitle title='EDIT WORKOUT' />
                {editStep === 0 &&
                <View>
                    <View style={styles.directions}>
                        <Text style={styles.directionsText}>Choose a workout to edit.</Text>
                    </View>
                    <View style={styles.listContainer}>
                        <WorkoutList
                            rightIcon={this.rightIcon}
                        />
                    </View>
                    <Button 
                        buttonStyle={{ width: 100, marginLeft: SCREEN_WIDTH * .05,}}
                        onPress={this.onBackListVisible}
                        title="BACK"
                        backgroundColor="#0043cb"
                    />
                </View>
                }
                {editStep === 1 &&
                <View>
                    <View style={styles.directions}>
                        <Text style={styles.directionsText}>Step One: Edit workout name or description</Text>
                    </View>
                    <View style={styles.stepOneContainer}>
                        <FormLabel>Name:</FormLabel>
                        <FormInput 
                            value={name}
                        />
                        <FormLabel>Description:</FormLabel>
                        <FormInput 
                            value={description}
                        />
                    </View>
                        <Button 
                            buttonStyle={{ width: 125, marginLeft: SCREEN_WIDTH * .05}}
                            onPress={() => this.moveEditStep(true)}
                            title="FORWARD"
                            backgroundColor="#8f9bff"
                        />
                        <Button 
                            buttonStyle={{ width: 125, marginLeft: SCREEN_WIDTH * .05}}
                            onPress={() => this.moveEditStep(false)}
                            title="BACK"
                            backgroundColor="#0043cb"
                        />
                </View>    
                }
                {editStep === 2 &&
                    <View>
                        <View style={styles.directions}>
                            <Text style={styles.directionsText}>Step Two: Add or delete exercises.</Text>
                        </View>
                        <View style={styles.choiceContainer}>
                            <ChoiceButton 
                                choiceOne="ADD" 
                                choiceTwo="DELETE"
                                selected={this.props.edit_workouts.exerciseEditOption}
                                onPress={this.onChoiceButtonPress}
                            />
                        </View>
                        <ScrollView style={styles.stepTwoScrollView}>
                            {this.renderExercisesList()}
                        </ScrollView>
                        <Button 
                            buttonStyle={{ width: 125, marginLeft: SCREEN_WIDTH * .05,}}
                            onPress={() => this.moveEditStep(true)}
                            title="FORWARD"
                            backgroundColor="#8f9bff"
                        />
                        <Button 
                            buttonStyle={{ width: 125, marginLeft: SCREEN_WIDTH * .05,}}
                            onPress={() => this.moveEditStep(false)}
                            title="BACK"
                            backgroundColor="#0043cb"
                        />
                    </View>
                }
                {editStep === 3 &&
                    <View>
                        <View style={styles.directions}>
                            <Text style={styles.directionsText}>Step Three</Text>
                        </View>
                        <Button 
                            buttonStyle={{ width: 125, marginLeft: SCREEN_WIDTH * .1,}}
                            onPress={() => this.moveEditStep(false)}
                            title="BACK"
                            backgroundColor="#0043cb"
                        />
                    </View>
                }
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { edit_workouts } = state;
    return {
        edit_workouts
    }
}

const styles = StyleSheet.create({
    stepOneContainer: {
        backgroundColor: "#f7f7f7",
        marginLeft: SCREEN_WIDTH * .05,
        width: SCREEN_WIDTH * .9,
        marginBottom: SCREEN_HEIGHT * .05,
        paddingBottom: SCREEN_HEIGHT * .025
    },
    stepTwoScrollView: {
        width: SCREEN_WIDTH * .9,
        marginLeft: SCREEN_WIDTH * .05,
        height: SCREEN_HEIGHT *.40,
        marginBottom: SCREEN_HEIGHT * .05,
    },
    stepTwoContainer: {
        backgroundColor: '#f7f7f7'
    },
    listContainer: {
        width: SCREEN_WIDTH * .9,
        marginLeft: SCREEN_WIDTH * .05,
        height: SCREEN_HEIGHT *.60,
        marginBottom: SCREEN_HEIGHT * .05
    },
    choiceContainer: {
        height: choiceHeight,
        backgroundColor: "#f7f7f7",
        alignItems: 'center',
        justifyContent: 'center'
    },
    directions: {
        height: SCREEN_HEIGHT * .08,
        justifyContent: 'center',
        alignItems: 'center'
    },
    directionsText: {
        fontSize: 20
    },
    buttonContainer: {
        width: SCREEN_WIDTH * .9,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})
const EditWorkout = connect(mapStateToProps, actions)(_EditWorkout);
export { EditWorkout };