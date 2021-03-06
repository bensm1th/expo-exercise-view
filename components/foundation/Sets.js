import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Picker } from 'react-native';
import { Icon, FormLabel } from 'react-native-elements';
import ModalPicker from 'react-native-modal-picker';
import * as types from '../../actions/types';
import colors from '../../colors';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;

const renderWeights = () => {
    let weights = [];
    for (let i = 0; i < 500; i++) {
        weights.push({ key: `${i}`, label: `${i}` });
    }
    return weights; 
};

const renderReps = () => {
    let reps = [];
    for (let i = 1; i < 100; i++) {
        reps.push({ key: `${i}`, label: `${i}` });
    }
    return reps;
};

class Sets extends Component {
    render() {
        const { exerciseId, _id } = this.props;
        const weights = renderWeights();
        const reps = renderReps();
        return (
            <View style={styles.setContainer}>
            <View style={styles.pickersContainer}>
                <View>
                    <Text>weight:</Text>
                    <ModalPicker
                        initValue={this.props.weight}
                        onChange={text => this.props.changeSetTextMethod(text.label, types.CHANGE_SET_WEIGHT_TEXT, _id, exerciseId)}
                        data={weights}
                    >
                        <TextInput 
                            style={styles.inputStyle}
                            editable={false}
                            value={this.props.weight}
                            placeholder='weight'
                        />
                    </ModalPicker> 
                </View>
                <View>
                    <Text>reps:</Text>
                    <ModalPicker
                        data={reps}
                        initValue={this.props.reps}
                        onChange={text => this.props.changeSetTextMethod(text.label, types.CHANGE_SET_REPS_TEXT, _id, exerciseId)}
                    >
                        <TextInput 
                            style={styles.inputStyle}
                            editable={false}
                            value={this.props.reps}
                            placeholder='reps'
                        />
                    </ModalPicker>   
                </View>
                <TouchableOpacity
                    onPress={() => this.props.deleteSetMethod(exerciseId, _id)}
                    style={styles.icon}
                >  
                    <Icon 
                        name="cancel"
                        size={30}
                        color={colors.primary.medium}
                    />
                </TouchableOpacity>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    picker: {
        height: 500,
        width: 200
    },
    pickersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 5,
        marginHorizontal: SCREEN_WIDTH * 0.036,
        padding: 5
    },
    setContainer: {
        backgroundColor: colors.background.dark,
        borderWidth: 1,
        borderColor: colors.secondary.light,
        marginHorizontal: SCREEN_WIDTH * 0.036,
        marginBottom: 10
    },
    inputStyle: {
        borderWidth: 1, 
        borderColor: '#ccc', 
        padding: 10, 
        height: 30, 
        width: 75, 
        backgroundColor: colors.background.white
    },
    icon: {
        marginTop: 10
    }
});

export default Sets;

