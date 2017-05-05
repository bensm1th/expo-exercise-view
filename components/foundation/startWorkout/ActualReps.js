import React from 'react';
import { Text, View, StyleSheet, TextInput, Dimensions } from 'react-native';
import ModalPicker from 'react-native-modal-picker';
import * as types from '../../../actions/types';
import colors from '../../../colors';

let SCREEN_WIDTH = Dimensions.get('window').width;

const makeWeights = () => {
    let weights = [];
    for (let i = 0; i < 500; i++) {
        weights.push({ key: `${i}`, label: `${i}` });
    }
    return weights; 
};

const makeReps = () => {
    let reps = [];
    for (let i = 1; i < 100; i++) {
        reps.push({ key: `${i}`, label: `${i}` });
    }
    return reps;
};


const changeActualSetText = (text, type, callback) => {
    text = text.toString();
    callback({ text, type });
};

const ActualReps = props => {
    const { openedSet, startedWorkout: { exercises } } = props;
        const values = exercises.reduce((init, exercise) => {
            const foundSet = exercise.sets.filter(set => set._id === openedSet._id);
            if (foundSet.length) {
                init = foundSet[0];
            }
            return init;
        }, {});
        const { goals, actual: { weight, number }, _id } = values;
        const bothTypedIn = weight.length > 0 && number.length > 0; 
        const weights = makeWeights();
        const reps = makeReps();
        return (
            <View style={styles.pickersContainer}>
                <View style={styles.formUnit}>
                    <Text>weight: </Text>
                    <ModalPicker
                        onChange={text => changeActualSetText(text.label, types.CHANGE_ACTUAL_SET_WEIGHT, props.setChangeAcutalText)}
                        data={weights}
                    >
                        <TextInput 
                            style={styles.formInput}
                            editable={false}
                            value={weight}
                            placeholder='weight'
                        />
                    </ModalPicker> 
                </View>
                <View style={styles.formUnit}>
                    <Text>reps: </Text>
                    <ModalPicker
                        data={reps}
                        onChange={text => changeActualSetText(text.label, types.CHANGE_ACTUAL_SET_REPS, props.setChangeAcutalText)}
                    >
                        <TextInput 
                            style={styles.formInput}
                            editable={false}
                            value={number}
                            placeholder='reps'
                        />
                    </ModalPicker>   
                </View>
            </View>
        );
};

const styles = StyleSheet.create({
    pickersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: SCREEN_WIDTH * 0.036,
        padding: 5
    },
    formUnit: {
        flexDirection: 'row'
    },
    formInput: {
        borderWidth: 1, 
        borderColor: '#ccc', 
        padding: 10, 
        width: 75
    }
});

export { ActualReps };
