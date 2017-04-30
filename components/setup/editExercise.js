import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormLabel, FormInput, Button, Icon, FormValidationMessage } from 'react-native-elements';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet, ListView, Picker } from 'react-native';
import ListTitle from '../foundation/listTitle';
import ExercisesList from '../foundation/listViewExample';
import * as actions from '../../actions';
import * as types from '../../actions/types';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;
let headerHeight = SCREEN_HEIGHT * .1;

const validateExerciseForm = formProps => {
 const { name, description, type, points } = formProps;
 let errorMessage = "";
 let countErrors = 0;
 if (name.length === 0) {
     countErrors++;
     errorMessage += 'Exercise name required. ';
 }
 if (description.length === 0) {
     countErrors++;
     errorMessage += 'Description required. ';
 }
 if (type.length === 0) {
     countErrors++;
     errorMessage += 'Type required. ';
 }
 if (points.length === 0) {
     countErrors++;
     errorMessage += 'Points required.'
 }
 if (countErrors === 0) {
     return {complete: true, errorMessage }
 }
 if (countErrors > 0) {
     return {complete: false, errorMessage }
 }
}

class _EditExercise extends Component {

    constructor(props) {
        super(props);
    }

    changeText = (type, text) => {
        this.props.editExerciseText({ type, text });
    }

    onSave = () => {
        const validate = validateExerciseForm(this.props.selectedExercise);
        if (!validate.complete) {
            return this.props.errorMessage(validate.errorMessage);
        }
        this.props.errorMessage('');
        this.props.exerciseInfoUpdated(this.props.selectedExercise);
        this.props.navigation.navigate('setup');
    }

    onBack = () => {
        this.props.errorMessage('');
        this.props.toggleExerciseVisibility();
        this.props.exerciseInfoClose();
    }

    onBackListVisible = () => {
        this.props.exerciseInfoVisibility('');
        this.props.navigation.navigate('setup');
    }

    rightIcon = () => {
        return <Icon name="chevron-right" size={40} />
    }

    render() {
        const { listVisibility, 
                selectedExercise, 
                selectedExercise: { 
                    name, points, description, type 
                } } = this.props.setup_exercises.exerciseEdit;
                let stringPoints;
                if (points !== undefined) {
                    stringPoints = points.toString();
                } 
        return (
            <View>
                <ListTitle title='EDIT EXERCISE' />
                <View>
                    {listVisibility &&
                    <View>
                        <View style={styles.directions}>
                            <Text style={styles.directionsText}>Choose an exercise to edit.</Text>
                        </View>
                    
                        <View style={styles.listContainer}>
                            <ExercisesList 
                                rightIcon={this.rightIcon} 
                                onSelect={this.props.exerciseEditVisibility}
                            />
                        </View>
                        <Button 
                            buttonStyle={{ width: 100, marginLeft: SCREEN_WIDTH * .1,}}
                            onPress={this.onBackListVisible}
                            title="BACK"
                            backgroundColor="#0043cb"
                        />
                    </View>
                    }   
                    {!listVisibility &&
                    <View>
                        <FormLabel>Name</FormLabel>
                        <FormInput
                            value={name}
                            onChangeText={(text) => this.changeText(types.EDIT_EXERCISE_NAME, text)}
                        />
                        <FormLabel>Description</FormLabel>
                        <FormInput
                            value={description}
                            onChangeText={(text) => this.changeText(types.EDIT_EXERCISE_DESCRIPTION, text)}
                            multiline={true}
                            numberOfLines={4}
                            inputStyle={{ height: 100}}
                        />
                    <View style={styles.pickerLabels}>
                        <FormLabel>Exercise Type</FormLabel>
                        <FormLabel>Point Value</FormLabel>
                    </View>
                    
                    <View style={styles.pickersContainer}>
                        <Picker
                            selectedValue={type}
                            onValueChange={(text) => this.changeText(types.EDIT_EXERCISE_TYPE, text)}
                            style={styles.picker}
                        >    
                            <Picker.Item label="Strength" value ="Strength" />
                            <Picker.Item label="Endurance" value ="Endurance" />
                            <Picker.Item label="Balance" value ="Balance" />
                            <Picker.Item label="Flexibility" value ="Flexibility" />
                        </Picker>
                        
                        <Picker
                            style={styles.picker}
                            selectedValue={stringPoints}
                            onValueChange={(text) => this.changeText(types.EDIT_EXERCISE_POINTS, text)}
                        >    
                            <Picker.Item label="1" value ="1" />
                            <Picker.Item label="2" value ="2" />
                            <Picker.Item label="3" value ="3" />
                            <Picker.Item label="4" value ="4" />
                            <Picker.Item label="5" value ="5" />
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
                                backgroundColor='#8f9bff'
                            />
                            <Button 
                                title="BACK"
                                onPress={this.onBack}
                                backgroundColor="#0043cb"
                            />
                        </View>
 
                    </View>
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        width: SCREEN_WIDTH * .8,
        marginLeft: SCREEN_WIDTH * .1,
        height: SCREEN_HEIGHT *.60,
        marginBottom: SCREEN_HEIGHT * .05
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
        marginRight: SCREEN_WIDTH * .036,
        marginLeft: SCREEN_WIDTH * .036,
    },
    errorText: {
        color: 'red'
    }
});

const mapStateToProps = (state) => {
    const { setup_exercises } = state;
    return { 
        setup_exercises,
        selectedExercise: state.setup_exercises.exerciseEdit.selectedExercise    
    }
}

const EditExercise = connect(mapStateToProps, actions)(_EditExercise);

export { EditExercise };