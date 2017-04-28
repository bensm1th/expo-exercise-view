import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Dimensions, UIManager, LayoutAnimation, 
    TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { Icon, Button, FormInput, FormLabel } from 'react-native-elements';
import ListTitle from '../components/foundation/listTitle';
import EditStepZero from '../components/foundation/editWorkout/EditStepZero';
import StepFour from '../components/foundation/createWorkout/StepFour';
import OpenedExercise from '../components/foundation/startWorkout/openedExercises';
import StartStepTwo from '../components/foundation/startWorkout/StartStepTwo';
import FinalExercises from '../components/foundation/startWorkout/finalExercises';
import * as actions from '../actions';
import * as types from '../actions/types';

let SCREEN_WIDTH = Dimensions.get("window").width;
let SCREEN_HEIGHT = Dimensions.get("window").height;

class StartScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.easeInEaseOut();
    }
    
    static navigationOptions = {
        title: 'Start',
        tabBar: {
            icon: ({ tintColor }) => {
                return <Icon 
                    name="plus"
                    size={30}
                    type="octicon"
                    color={'white'}
                    iconStyle={{ marginTop: 10, marginBottom: 3, marginLeft: 5 }}
                />
            }
        }
    }

    rightIcon = () => {
        return <Icon 
                    name="plus"
                    size={30}
                    type="octicon"
                    color={'#f44330'}
                />
    }

    renderFinalExercises = () => {
        const { startedWorkout: { exercises } } = this.props.start;
        return <FinalExercises exercises={exercises} renderSets={this.renderSets} />    
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

    startWorkout = () => {
        this.props.workoutStart();
    }

    onBack = () => {
        this.props.startStepDec();
    }

    renderExercises = () => {
        const { openedExercise, startedWorkout: { exercises } } = this.props.start;
        return (
            <OpenedExercise 
                exercises={exercises}
                openSets={this.openSets}
                openedExercise={openedExercise}
                renderOpenedSets={this.renderOpenedSets}
            />
            );
    }

    renderOpenedSets = sets => {
        return sets.map(set => {
            const open = this.props.start.openedSet._id === set._id
            const iconName = open ? "minus-circle": "plus-circle"
            return (
            <View style={styles.setContainer} key={set._id}>
                <View key={set._id} style={styles.setContainerTop}>
                    <TouchableOpacity onPress={() => this.props.setsEditOpen(set)}>
                        <Icon 
                            name={iconName}
                            type="font-awesome"
                            size={40}
                        />
                    </TouchableOpacity>
                    <Text>Goals: </Text>
                    <Text>weight - {set.goals.weight}</Text>
                    <Text>reps - {set.goals.number}</Text>
                </View>
                {open &&
                <View>
                    {this.renderActualReps()}
                </View>    
                }
            </View>
            );
        });
    }

    changeActualSetText = (text, type) => {
        text = text.toString();
        this.props.setChangeAcutalText({text, type});
    }

    renderActualReps = () => {
        const { openedSet, startedWorkout: { exercises } } = this.props.start;
        const values = exercises.map(exercise => {
            return exercise.sets.filter(set => {
                return set._id === openedSet._id;
            });
        });
        console.log('---------- values ----------');
        console.log(values)
        return (
            <View>
                <FormLabel>Weight:</FormLabel>
                <FormInput 
                    onChangeText={text => this.changeActualSetText(text, types.CHANGE_ACTUAL_SET_WEIGHT)}
                    value='0'   
                />
                <FormLabel>Reps: </FormLabel>
                <FormInput 
                    onChangeText={text => this.changeActualSetText(text, types.CHANGE_ACTUAL_SET_REPS)}
                    value='0'
                />
            </View>
        )
    }

    openSets = exercise => {
        this.props.setsOpen(exercise);
    }

    render() {
        const { startedWorkout: { name, description, exercises },  startStep } = this.props.start;
        const buttons = {
            buttonOne: {
                text: 'START',
                onPress: this.startWorkout
            },
            buttonTwo: {
                text: 'BACK',
                onPress: this.onBack
            }
        }
        return (
            <View style={styles.container}>
                <ListTitle title="Start Workout"/>
                {startStep === 0 &&
                <EditStepZero
                    rightIcon={this.rightIcon}
                    onBackListVisible={this.onBackListVisible}
                    title='Choose a workout to start.'
                    parent="start"
                />
                }
                {startStep === 1 &&
                <StepFour
                    {...this.props}
                    saveWorkoutMethod={this.saveWorkoutMethod}
                    renderFinalExercises={this.renderFinalExercises}
                    decrementStep={this.decrementStep}
                    workoutInfo = {{ name, description, title: 'Start this workout?'}}
                    buttons={buttons}
                />   
                }
                {startStep === 2 &&
                <StartStepTwo
                    name={name}
                    description={description}
                    renderExercises={this.renderExercises}
                    onBack={this.onBack}
                />
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    setContainerTop: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: "#a9a9a9",
        height: SCREEN_HEIGHT * .1,
        borderBottomWidth: 1,
        borderBottomColor: 'silver'
    },
    setContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }
});

const mapStateToProps = state => {
    const { start } = state;
    return {
        start
    }
}

export default connect(mapStateToProps, actions)(StartScreen);