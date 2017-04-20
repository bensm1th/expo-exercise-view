import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements';
import { Text, View, TouchableOpacity, Dimensions, StyleSheet, ListView } from 'react-native';
import ListTitle from '../foundation/listTitle';
import ExercisesList from '../foundation/listViewExample';
import * as actions from '../../actions';
import * as types from '../../actions/types';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
let headerHeight = ScreenHeight * .1;

class _EditExercise extends Component {

    constructor(props) {
        super(props);
    }

    changeText = (type, text) => {
        this.props.editExerciseText({ type, text });
    }

    onSave = () => {
        this.props.exerciseInfoUpdated(this.props.selectedExercise);
        this.props.navigation.navigate('setup');
    }

    onBack = () => {
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
                            buttonStyle={{ width: 100, marginLeft: ScreenWidth * .1,}}
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
                        <FormLabel>Exercise Type</FormLabel>
                        <FormInput
                            value={type}
                            onChangeText={(text) => this.changeText(types.EDIT_EXERCISE_TYPE, text)}
                        />
                        <FormLabel>Point Value</FormLabel>
                        <FormInput
                            value={stringPoints}
                            onChangeText={(text) => this.changeText(types.EDIT_EXERCISE_POINTS, text)}
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
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listContainer: {
        width: ScreenWidth * .8,
        marginLeft: ScreenWidth * .1,
        height: ScreenHeight *.60,
        marginBottom: ScreenHeight * .05
    },
    directions: {
        height: ScreenHeight * .08,
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