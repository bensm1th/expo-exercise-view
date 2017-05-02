import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, UIManager, LayoutAnimation } from 'react-native';
import { Icon } from 'react-native-elements';
import ListTitle from '../components/foundation/listTitle';
import EditStepZero from '../components/foundation/editWorkout/EditStepZero';
import StepFour from '../components/foundation/createWorkout/StepFour';
import * as Start from '../components/foundation/startWorkout';
import * as actions from '../actions';
import colors from '../colors';

let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREEN_HEIGHT = Dimensions.get('window').height;

class StartScreen extends Component {

    static navigationOptions = {
        title: 'Start',
        tabBar: {
            icon: ({ tintColor }) => {
                return (<Icon 
                    name="plus"
                    size={30}
                    type="octicon"
                    color={'white'}
                    iconStyle={{ marginTop: 10, marginBottom: 3, marginLeft: 5 }}
                />);
            }
        }
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.easeInEaseOut();
    }

    onBack = () => this.props.startStepDec();
    finish = () => this.props.finishWorkout(this.props.start.startedWorkout);
    pause = () => this.props.pauseWorkout();
    resume = () => this.props.resumeWorkout();
    renderSets = sets => <Start.StartedSet sets={sets} />;
    startWorkout = () => this.props.workoutStart();
    openSets = exercise => this.props.setsOpen(exercise);

    rightIcon = () => (
        <Icon 
            name="plus"
            size={30}
            type="octicon"
            color={colors.primary.medium}
        />
    );
    
    renderFinalExercises = () => {
        const { startedWorkout: { exercises } } = this.props.start;
        return <Start.FinalExercises exercises={exercises} renderSets={this.renderSets} />;    
    }

    renderExercises = () => {
        const { openedExercise, startedWorkout: { exercises }, finishedSets } = this.props.start;
        return (
            <Start.OpenedExercises 
                exercises={exercises}
                openSets={this.openSets}
                openedExercise={openedExercise}
                renderOpenedSets={this.renderOpenedSets}
                finishedSets={finishedSets}
            />
            );
    }

    renderOpenedSets = sets => (
        <Start.OpenedSet 
            {...this.props.start} 
            sets={sets} 
            renderActualReps={this.renderActualReps} 
            setsEditOpen={this.props.setsEditOpen}
        />
    );
    
    renderActualReps = () => (
        <Start.ActualReps 
            {...this.props.start} 
            setChangeAcutalText={this.props.setChangeAcutalText} 
        />
    );
    
    render() {
        const { startedWorkout: { name, description }, startStep } = this.props.start;
        const buttons = {
            buttonOne: {
                text: 'START',
                onPress: this.startWorkout
            },
            buttonTwo: {
                text: 'BACK',
                onPress: this.onBack
            }
        };
        return (
            <View>
                <ListTitle title="Start Workout" />
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
                    workoutInfo={{ name, description, title: 'Start this workout?'}}
                    buttons={buttons}
                    backgroundColor={colors.background.light}
                />   
                }
                {startStep === 2 &&
                <Start.StartStepTwo
                    name={name}
                    description={description}
                    renderExercises={this.renderExercises}
                    onBack={this.onBack}
                    {...this.props.start}
                    pause={this.pause}
                    finish={this.finish}
                    resume={this.resume}
                />
                }
            </View>
        );
    }
}

const mapStateToProps = state => ({ start: state.start });
export default connect(mapStateToProps, actions)(StartScreen);
