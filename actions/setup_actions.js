import axios from 'axios';
import * as types from './types';

const URL = '192.168.1.109';
//const ROOT_URL = `http://${URL}:3000`;
const ROOT_URL = 'https://mobile-lifting.herokuapp.com';

export const cancelWorkoutCreate = () => {
    return {
        type: types.CANCEL_WORKOUT_CREATE
    };
};

export const clearWorkoutCreate = () => {
    return {
        type: types.CLEAR_WORKOUT_CREATE
    };
};

export const workoutEditError = errorMessage => {
    return {
        type: types.ERROR_WORKOUT_EDIT,
        payload: errorMessage
    };
};

export const workoutCreateError = errorMessage => {
    return {
        type: types.ERROR_WORKOUT_CREATE,
        payload: errorMessage
    };
};

export const errorMessage = errorMessage => {
    return {
        type: types.EXERCISE_CREATE_ERROR,
        payload: errorMessage
    };
};

export const setEditStep = value => {
    return {
        type: types.SET_EDIT_STEP,
        payload: value
    };
};

export const workoutCreateStepSet = value => {
    return {
        type: types.SET_CREATE_STEP,
        payload: value
    };
};

export const changeEditWorkoutText = ({text, type}) => {
    return {
        type,
        payload: text
    };
};

export const createWorkoutText = ({ text, type }) => {
    return {
            type,
            payload: text
        };
};

export const switchToCreateWorkout = exercises => {
    return {
        type: types.EDIT_ADD_EXERCISES,
        payload: exercises
    };
};

export const getEditAddExercises = () => {
    return {
        type: types.GET_EDIT_ADD_EXERCISES,
    };
};

export const exerciseToDelete = id => {
    return {
        type: types.PUSH_TO_DELETE_ARRAY,
        payload: id
    };
};

export const removeExercisesFromWorkout = () => {
    return {
        type: types.REMOVE_EXERCISES_WORKOUT
    };
};

export const exerciseToAdd = id => {
    return {
        type: types.PUSH_TO_ADD_ARRAY,
        payload: id
    };
};

export const toggleDeleteInfo = id => {
    return {
        type: types.TOGGLE_DELETE_INFO,
        payload: id
    };
};

export const fetchExercises = (id) => async dispatch => {
    let response = await axios.get(`${ROOT_URL}/exerciseInfo?id=${id}`);
    dispatch({
        type: types.FETCH_EXERCISES,
        payload: response.data
    });
};

export const saveWorkout = (props, id) => {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/createworkout?id=${id}`, props)
            .then(response => {
                dispatch( {
                    type: types.SAVE_WORKOUT
                });
            })
            .catch(err => console.log(err));
    };
};

export const deleteWorkout = id => async dispatch => {
    let reponse = await axios.delete(`${ROOT_URL}/workout/${id}`);

    dispatch({
        type: types.DELETE_WORKOUT
    });
};

export const fetchWorkouts = (id) => {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/workout?id=${id}`)
            .then(({ data }) => {
                dispatch({
                    type: types.FETCH_WORKOUTS,
                    payload: data
                });
            })
            .catch(err => console.log(err));
    };
};

export const deleteSet = (props) => {
    return {
        type: types.DELETE_SET,
        payload: props
    };
};

export const toggleSetsView = exerciseId => {
    return {
        type: types.TOGGLE_SETS_VIEW,
        payload: exerciseId
    };
};

export const toggleExerciseCheck = (id) => {
    return {
        type: types.TOGGLE_EXERCISE_CHECK,
        payload: id
    };
};

export const createWorkoutStepInc = () => {
    return {
        type: types.INCREMENT_CREATE_WORKOUT_STEP
    };
};

export const incrementEditStep = () => {
    return {
        type: types.INCREMENT_EDIT_STEP,
    };
};

export const decrementEditStep = () => {
    return {
        type: types.DECREMENT_EDIT_STEP
    };
};

export const createWorkoutStepDec = () => {
    return {
        type: types.DECREMENT_CREATE_WORKOUT_STEP
    };
};

export const setupChoice = choice => {
    return {
        type: types.SETUP_CHOICE,
        payload: choice
    };
};

export const exerciseEditOption = choice => {
    return {
        type: types.EXERCISE_EDIT_OPTION,
        payload: choice
    };
};

export const createExerciseText = ({ text, type }) => {
    return {
        type,
        payload: text
    };
};

export const exerciseNameChanged = (text) => {
    return {
        type: types.CHANGE_EXERCISE_NAME,
        payload: text
    };
};

export const exercisePointsChanged = (text) => {
    return {
        type: types.CHANGE_EXERCISE_POINTS,
        payload: text
    };
};

export const exerciseTypeChanged = (text) => {
    return {
        type: types.CHANGE_EXERCISE_TYPE,
        payload: text
    };
};

export const exerciseDescriptionChanged = (text) => {
    return {
        type: types.CHANGE_EXERCISE_DESCRIPTION,
        payload: text
    };
};

export const exerciseInfoSaved = ({ exerciseName, exerciseDescription, exerciseType, exercisePoints }, id) => {
    return function(dispatch) {
        const exerciseInfoProps = {
            name: exerciseName,
            type: exerciseType,
            description: exerciseDescription,
            points: exercisePoints
        };
        axios.post(`${ROOT_URL}/exerciseInfo?id=${id}`, exerciseInfoProps)
            .then(response => {
                dispatch({ type: types.SAVE_EXERCISE_INFO, payload: response.data });
            })
            .catch((err) => {
                console.log(err);
            });
        };
};

export const exerciseEditVisibility = (id, userId) => {
    return function(dispatch) {
        axios.get(`${ROOT_URL}/exerciseInfo?id=${userId}`)
            .then(exercises => {
                const exercise = exercises.data.filter(_exercise => {
                    return _exercise._id === id;
                })[0];
                dispatch({
                    type: types.TOGGLE_EXERCISE_VISIBILITY,
                    payload: exercise
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const workoutEditVisibility = id => {
    return {
        type: types.TOGGLE_WORKOUT_VISIBILITY,
        payload: id
    };
};

export const exerciseDeleteVisibility = (id, userId) => async dispatch => {
    let response = await axios.get(`${ROOT_URL}/exerciseInfo?id=${userId}`);
    const exercise = response.data.filter(_exercise => {
        return _exercise._id === id;
    })[0];
    dispatch({
        type: types.TOGGLE_DELETE_EXERCISE_VISIBILITY,
        payload: exercise
    });
};

export const fetchExercisesById = props => {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/exerciseInfo?prop=exercises`, props)
            .then(exercises => {
                dispatch({
                    type: types.FETCH_EXERCISES_BY_ID,
                    payload: exercises.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
};

export const toggleExerciseDeleteListVisibility = () => {
    return {
        type: types.TOGGLE_DELETE_EXERCISE_VISIBILITY,
        payload: {}
    };
};

export const exerciseInfoUpdated = formProps => async dispatch => {
    let response = await axios.put(`${ROOT_URL}/exerciseInfo/${formProps._id}`, formProps);
    dispatch({
        type: types.TOGGLE_EXERCISE_VISIBILITY,
        payload: {}
    });
};

export const exerciseInfoDelete = id => async dispatch => {
    await axios.delete(`${ROOT_URL}/exerciseInfo/${id}`);
    dispatch({
        type: types.TOGGLE_DELETE_EXERCISE_VISIBILITY,
        payload: {}
    });
};

export const toggleExerciseVisibility = () => {
    return {
        type: types.TOGGLE_EXERCISE_VISIBILITY,
        payload: {}
    };
};

export const exerciseInfoVisibility = (id) => {
    return {
        type: types.TOGGLE_EDIT_INFO,
        payload: id
    };
};

export const workoutInfoVisibility = (id) => {
    return {
        type: types.TOGGLE_WORKOUT_INFO,
        payload: id
    };
};

export const exerciseInfoClose = () => {
    return {
        type: types.CLOSE_EDIT_INFO
    };
};

export const editExerciseText = ({ text, type }) => {
    return {
        type,
        payload: text
    };
};

export const changeSetText = (props) => {
    return {
        type: props.type,
        payload: props
    };
};

export const addSetToExerciseModel = id => {
    return {
        type: types.ADD_SET,
        payload: id
    };
};
