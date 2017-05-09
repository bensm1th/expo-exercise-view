import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import moment from 'moment';
import * as types from './types';

const URL = '192.168.1.109';
//const ROOT_URL = `http://${URL}:3000`;
const ROOT_URL = 'https://mobile-lifting.herokuapp.com';

export const sendPauseTime = time => {
    return {
        type: types.SEND_PAUSE_TIME,
        payload: time
    };
};

export const resumeWorkout = () => {
    const startTime = moment(); 
    return {
        type: types.RESUME_WORKOUT,
        payload: startTime
    };
};

export const pauseWorkout = () => {
    return {
        type: types.PAUSE_WORKOUT,
    };
};

export const setSelectedDay = (day, date) => {
    return {
        type: types.SET_SELECTED_DAY,
        payload: { day, date }
    };
};

export const setSelectedWeek = (week, date) => {
    return {
        type: types.SET_SELECTED_WEEK,
        payload: { week, date }
    };
};

export const setSelectedMonth = (month, date) => {
    return {
        type: types.SET_SELECTED_MONTH,
        payload: { month, date }
    };
};

export const toggleStatsVisibility = period => {
    return {
        type: types.TOGGLE_STATS_VISIBILITY,
        payload: period
    };
};

export const setVisibleWorkout = workout => {
    return {
        type: types.SET_VISIBLE_STATS_WORKOUT,
        payload: workout
    };
};

export const statsHideWorkouts = () => {
    return {
        type: types.STATS_HIDE_WORKOUTS
    };
};

