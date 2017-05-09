import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import moment from 'moment';
import * as types from './types';

const URL = '192.168.1.109';
//const ROOT_URL = `http://${URL}:3000`;
const ROOT_URL = 'https://mobile-lifting.herokuapp.com';

export const setChangeAcutalText = props => {
    return {
        type: props.type,
        payload: props.text
    };
};

export const finishWorkout = (props, navigate, userId) => async dispatch => {
    let response = await axios.post(`${ROOT_URL}/createworkout/update`, props);
    let workouts = await axios.get(`${ROOT_URL}/workout?id=${userId}`);
    const completedWorkouts = workouts.data.filter(workout => workout.finished);
    dispatch({
        type: types.COMPLETED_WORKOUTS_FETCH,
        payload: completedWorkouts
    });
    dispatch({
        type: types.FINISH_WORKOUT,
        payload: response.data
    });
    navigate('stats');
};

export const fetchCompletedWorkouts = (userId) => async dispatch => {
    let response = await axios.get(`${ROOT_URL}/workout?id=${userId}`);
    const completedWorkouts = response.data.filter(workout => workout.finished);
    dispatch({
        type: types.COMPLETED_WORKOUTS_FETCH,
        payload: completedWorkouts
    });
};

export const setsEditOpen = set => {
    return {
        type: types.EDIT_OPEN_SET,
        payload: set
    };
};

export const setsOpen = exercise => {
    return {
        type: types.OPEN_EXERCISE,
        payload: exercise
    };
}; 

export const workoutStart = () => {
    const startTime = moment();  
    return {
        type: types.START_WORKOUT,
        payload: startTime
    };
};

export const startStepDec = () => {
    return {
        type: types.DEC_START_STEP
    };
};

export const selectStartWorkout = workout => {
    return {
        type: types.SELECT_START_WORKOUT,
        payload: workout
    };
};

export const onBackDeleteWorkouts = () => {
    return {
        type: types.ON_BACK_DELETE_WORKOUTS
    };
};

export const cancelStartWorkout = () => {
    return {
        type: types.CANCEL_START_WORKOUT
    };
};


