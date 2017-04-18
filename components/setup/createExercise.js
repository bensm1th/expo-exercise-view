import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Dimensions } from 'react-native';
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements';
import * as actions from '../../actions';
import * as types from '../../actions/types';
import ListTitle from '../foundation/listTitle';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;
let headerHeight = SCREEN_HEIGHT * .1;

class _CreateExercise extends Component {
    constructor(props) {
        super(props);
    }

    changeText = (type, text) => {
        this.props.createExerciseText({type, text});
    }

    onSave = () => {
        const formProps = {...this.props.setup_exercises.exerciseForm}
        this.props.exerciseInfoSaved(formProps);
        this.props.navigation.navigate('setup');
    }

    onBack = () => {
        this.props.navigation.navigate('setup');
    }

    render() {
        const { exerciseName, exerciseDescription, exerciseType, exercisePoints } = this.props.setup_exercises.exerciseForm;
        return (
            <View style={styles.container}>
                <ListTitle title='CREATE EXERCISE' />
                    <FormLabel>Name</FormLabel>
                    <FormInput
                        onChangeText={(text) => this.changeText(types.CHANGE_EXERCISE_NAME, text)}
                        value={exerciseName}
                    />
                    <FormLabel>Description</FormLabel>

                    <FormInput
                        value={exerciseDescription}
                        onChangeText={(text) => this.changeText(types.CHANGE_EXERCISE_DESCRIPTION, text)}
                        multiline={true}
                        numberOfLines={4}
                        inputStyle={{ height: 100}}
                    />
                    <FormLabel>Exercise Type</FormLabel>
                    <FormInput
                        value={exerciseType}
                        onChangeText={(text) => this.changeText(types.CHANGE_EXERCISE_TYPE, text)}
                    />
                    <FormLabel>Point Value</FormLabel>
                    <FormInput
                        value={exercisePoints}
                        onChangeText={(text) => this.changeText(types.CHANGE_EXERCISE_POINTS, text)}
                    />
                    <View style={styles.buttonContainer}>
                        <Button 
                            title='SAVE'
                            onPress={this.onSave}
                            backgroundColor='#8f9bff'
                        />
                        <Button 
                            title="BACK"
                            onPress={this.onBack}
                            backgroundColor="#0043cb"
                        />
                    </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between'
    },
    buttonContainer: {
        width: 200,
        flexDirection: 'row',
        marginTop: 20
    }
});

const mapStateToProps = (state) => {
    const { setup_exercises } = state;
    return {
        setup_exercises
    }
}
const CreateExercise = connect(mapStateToProps, actions )(_CreateExercise); 
export { CreateExercise };