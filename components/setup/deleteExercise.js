import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormLabel, FormInput, Button, Icon } from 'react-native-elements';
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import ListTitle from '../foundation/listTitle';
import ExercisesList from '../foundation/listViewExample';
import * as actions from '../../actions';
import colors from '../../colors';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
let headerHeight = ScreenHeight * 0.1;

class _DeleteExercise extends Component {

    onDelete = () => {
        const { _id } = this.props.selectedExercise;
        this.props.exerciseInfoDelete(_id);
        this.props.navigation.navigate('setup');
    }

    onBack = () => {
        this.props.toggleExerciseDeleteListVisibility();
        this.props.navigation.navigate('setup');
    }

    onBackListVisible = () => {
        this.props.exerciseInfoVisibility('');
        this.props.navigation.navigate('setup');
    }

    rightIcon = () => {
        return (
            <Icon 
                name="chevron-right"
                size={40}
            />
        )
    }

    render() {
        const { listVisibility, 
            selectedExercise: { 
                name, points, description, type 
            } } = this.props.setup_exercises.exerciseDelete;
            let stringPoints;
            if (points !== undefined && points !== null) {
                stringPoints = points.toString();
            } 
        return (
            <View>
                <ListTitle title='DELETE EXERCISE' />
                <View>
                {listVisibility &&
                    <View>
                        <View style={styles.directions}>
                            <Text style={styles.directionsText}>Choose an exercise to delete.</Text>
                        </View>
                        <View style={styles.listContainer}>
                            <ExercisesList 
                                rightIcon={this.rightIcon} 
                                onSelect={this.props.exerciseDeleteVisibility}
                            />
                        </View>
                        <Button 
                            buttonStyle={{ width: 100, marginLeft: ScreenWidth * 0.05 }}
                            onPress={this.onBackListVisible}
                            title="BACK"
                            backgroundColor={colors.secondary.dark}
                        />
                    </View>
                }
                {!listVisibility &&
                        <View>
                        <FormLabel>Name</FormLabel>
                        <FormInput
                            value={name}
                            editable={false}
                        />
                        <FormLabel>Description</FormLabel>
                        <FormInput
                            value={description}
                            multiline={true}
                            numberOfLines={4}
                            inputStyle={{ height: 100 }}
                            editable={false}
                        />
                        <FormLabel>Exercise Type</FormLabel>
                        <FormInput
                            value={type}
                            editable={false}
                        />
                        <FormLabel>Point Value</FormLabel>
                        <FormInput
                            value={stringPoints}
                            editable={false}
                        />
                        <View style={styles.buttonContainer}>
                            <Button 
                                title='DELETE'
                                onPress={this.onDelete}
                                backgroundColor={colors.primary.medium}
                            />
                            <Button 
                                title="BACK"
                                onPress={this.onBack}
                                backgroundColor={colors.secondary.dark}
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
        width: ScreenWidth * 0.9,
        marginLeft: ScreenWidth * 0.05,
        maxHeight: ScreenHeight * 0.60,
        marginBottom: ScreenHeight * 0.05
    },
    directions: {
        height: ScreenHeight * 0.08,
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
        selectedExercise: state.setup_exercises.exerciseDelete.selectedExercise    
    };
};

const DeleteExercise = connect(mapStateToProps, actions)(_DeleteExercise);

export { DeleteExercise };
