import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Dimensions, UIManager, LayoutAnimation, 
    TouchableOpacity, TouchableWithoutFeedback, ScrollView, TextInput } from 'react-native'
import { Icon, Button, FormInput, FormLabel } from 'react-native-elements';
import ModalPicker from 'react-native-modal-picker';
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

const renderWeights = () => {
    let weights = []
    for (let i = 0; i < 500; i++) {
        weights.push({ key:`${i}`, label: `${i}` });
    }
    return weights; 
}

const renderReps = () => {
    let reps = [];
    for (let i = 1; i < 100; i++) {
        reps.push({ key:`${i}`, label: `${i}` });
    }
    return reps;
}


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
        const { openedExercise, startedWorkout: { exercises }, finishedSets } = this.props.start;

        return (
            <OpenedExercise 
                exercises={exercises}
                openSets={this.openSets}
                openedExercise={openedExercise}
                renderOpenedSets={this.renderOpenedSets}
                finishedSets={finishedSets}
            />
            );
    }

    renderOpenedSets = sets => {
        return sets.map(set => {
            const { openedSet, finishedSets } = this.props.start;
            const open = openedSet._id === set._id
            const setFinished = finishedSets.some(id => id === set._id);
            let iconName;
            if (open) {
                iconName = "minus-circle";
            }
            if (!open) {
                iconName = "plus-circle";
            }
            if (setFinished) {
                iconName = "check";
            }
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
        const values = exercises.reduce((init, exercise) => {
            const foundSet = exercise.sets.filter(set => {
                return set._id === openedSet._id;
            });
            if (foundSet.length) {
                init= foundSet[0];
            }
            return init;
        }, {});
        const { actual: { weight, number }, _id } = values;
        const bothTypedIn = weight.length > 0 && number.length > 0; 
        const weights = renderWeights();
        const reps = renderReps();
        return (
            <View style={styles.pickersContainer}>
                <View>
                    <Text>weight</Text>
                    <ModalPicker
                        initValue={weight}
                        onChange={text => this.changeActualSetText(text.label, types.CHANGE_ACTUAL_SET_WEIGHT)}
                        data={weights}
                    >
                        <TextInput 
                            style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30, width: 75}}
                            editable={false}
                            value={weight}
                            placeholder='weight'
                        />
                    </ModalPicker> 
                </View>
                <View>
                    <Text>reps</Text>
                    <ModalPicker
                        data={reps}
                        initValue={this.props.reps}
                        onChange={text => this.changeActualSetText(text.label, types.CHANGE_ACTUAL_SET_REPS)}
                    >
                        <TextInput 
                            style={{borderWidth:1, borderColor:'#ccc', padding:10, height:30, width: 75}}
                            editable={false}
                            value={number}
                            placeholder='reps'
                        />
                    </ModalPicker>   
                </View>
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
    },
    actualSetTop: {
        marginBottom: 5
    },
    actualSetBottom: {
        marginBottom: 5
    },
    pickersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10,
        borderColor: 'silver',
        borderWidth: 1,
        marginHorizontal: SCREEN_WIDTH * .036,
        padding: 5
    },
});

const mapStateToProps = state => {
    const { start } = state;
    return {
        start
    }
}

export default connect(mapStateToProps, actions)(StartScreen);