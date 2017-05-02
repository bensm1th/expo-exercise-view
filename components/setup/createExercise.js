import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Dimensions, Picker } from 'react-native';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements';
import * as actions from '../../actions';
import * as types from '../../actions/types';
import ListTitle from '../foundation/listTitle';
import colors from '../../colors';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;

const validateExerciseForm = formProps => {
    const { exerciseName, exerciseDescription, exerciseType, exercisePoints } = formProps;
    let errorMessage = '';
    let countErrors = 0;
    if (exerciseName.length === 0) {
        countErrors++;
        errorMessage += 'Exercise name required. ';
    }
    if (exerciseDescription.length === 0) {
        countErrors++;
        errorMessage += 'Description required. ';
    }
    if (exerciseType.length === 0) {
        countErrors++;
        errorMessage += 'Type required. ';
    }
    if (exercisePoints.length === 0) {
        countErrors++;
        errorMessage += 'Points required.';
    }
    if (countErrors === 0) {
        return { complete: true, errorMessage };
    }
    if (countErrors > 0) {
        return { complete: false, errorMessage };
    }
};

class _CreateExercise extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };
    }

    changeText = (type, text) => {
        this.props.createExerciseText({ type, text });
    }

    onSave = () => {
        const formProps = this.props.setup_exercises.exerciseForm;
        const validate = validateExerciseForm(formProps);
        if (!validate.complete) {
            return this.props.errorMessage(validate.errorMessage);
        }
        this.props.errorMessage('');
        this.props.exerciseInfoSaved(formProps);
        this.props.navigation.navigate('setup');
    }

    onBack = () => {
        this.props.errorMessage('');
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
                        inputStyle={{ height: 100 }}
                    />
                    <View style={styles.pickerLabels}>
                        <FormLabel>Exercise Type</FormLabel>
                        <FormLabel>Point Value</FormLabel>
                    </View>
                    
                    <View style={styles.pickersContainer}>
                        <Picker
                            selectedValue={exerciseType}
                            onValueChange={text => this.changeText(types.CHANGE_EXERCISE_TYPE, text)}
                            style={styles.picker}
                        >    
                            <Picker.Item label="Strength" value="Strength" />
                            <Picker.Item label="Endurance" value="Endurance" />
                            <Picker.Item label="Balance" value="Balance" />
                            <Picker.Item label="Flexibility" value="Flexibility" />
                        </Picker>
                        
                        <Picker
                            style={styles.picker}
                            selectedValue={exercisePoints}
                            onValueChange={text => this.changeText(types.CHANGE_EXERCISE_POINTS, text)}
                        >    
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                        </Picker>
                        
                    </View>
                    
                    {this.props.setup_exercises.errorMessage.length > 0 &&
                    <View style={styles.errorContainer}>
                        <FormValidationMessage style={styles.errorText}>{this.props.setup_exercises.errorMessage}</FormValidationMessage>
                    </View>
                    }
                    
                    <View style={styles.buttonContainer}>
                        <Button 
                            title='SAVE'
                            onPress={this.onSave}
                            backgroundColor={colors.secondary.light}
                        />
                        <Button 
                            title="BACK"
                            onPress={this.onBack}
                            backgroundColor={colors.secondary.dark}
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
    },
    picker: {
        height: 200,
        width: 200
    },
    pickersContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 50,
        marginLeft: 50
    },
    errorContainer: {
        marginRight: SCREEN_WIDTH * 0.036,
        marginLeft: SCREEN_WIDTH * 0.036,
    },
    errorText: {
        color: 'red'
    }
});

const mapStateToProps = (state) => {
    const { setup_exercises } = state;
    return {
        setup_exercises
    };
};
const CreateExercise = connect(mapStateToProps, actions)(_CreateExercise); 
export { CreateExercise };
