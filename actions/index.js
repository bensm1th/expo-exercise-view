import axios from 'axios';
import * as types from './types';

export const toggleExerciseCheck = (id) => {
    return {
        type: types.TOGGLE_EXERCISE_CHECK,
        payload: id
    }
}

export const createWorkoutText = ({ text, type }) => {
    return {
            type,
            payload: text
        }
}

export const createWorkoutStepInc = () => {
    return {
        type: types.INCREMENT_CREATE_WORKOUT_STEP
    }
}

export const createWorkoutStepDec = () => {
    return {
        type: types.DECREMENT_CREATE_WORKOUT_STEP
    }
}

export const setupChoice = (choice) => {
    return {
        type: types.SETUP_CHOICE,
        payload: choice
    }
}

export const createExerciseText = ({ text, type }) => {
    return {
        type,
        payload: text
    }
}

export const exerciseNameChanged = (text) => {
    return {
        type: types.CHANGE_EXERCISE_NAME,
        payload: text
    }
}

export const exercisePointsChanged = (text) => {
    return {
        type: types.CHANGE_EXERCISE_POINTS,
        payload: text
    }
}

export const exerciseTypeChanged = (text) => {
    return {
        type: types.CHANGE_EXERCISE_TYPE,
        payload: text
    }
}
export const exerciseDescriptionChanged = (text) => {
    return {
        type: types.CHANGE_EXERCISE_DESCRIPTION,
        payload: text
    }
} 

export const exerciseInfoSaved = ({ exerciseName, exerciseDescription, exerciseType, exercisePoints }) => {
    return function(dispatch){
        const exerciseInfoProps = {
            name: exerciseName,
            type: exerciseType,
            description: exerciseDescription,
            points: exercisePoints
        }
        axios.post('http://192.168.1.109:3000/exerciseInfo', exerciseInfoProps)
            .then(response => {
                dispatch({ type: types.SAVE_EXERCISE_INFO, payload: response.data });
            })
            .catch((err) => {
                console.log(err);
            });
        }
}

export const fetchExercises = () => {
    return function(dispatch) {
        axios.get('http://192.168.1.109:3000/exerciseInfo')
            .then(exercises => {
                dispatch({
                    type: types.FETCH_EXERCISES,
                    payload: exercises.data
                });
            })
            .catch(err => console.log(err));
    }
}

export const exerciseEditVisibility = (id) => {
    return function(dispatch) {
        axios.get('http://192.168.1.109:3000/exerciseInfo')
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
    }
}

export const exerciseDeleteVisibility = id => async dispatch => {
    let response = await axios.get('http://192.168.1.109:3000/exerciseInfo');
    const exercise = response.data.filter(_exercise => {
        return _exercise._id === id;
    })[0];
    dispatch({
        type: types.TOGGLE_DELETE_EXERCISE_VISIBILITY,
        payload: exercise
    });
}

export const fetchExercisesById = props => {
    return function(dispatch) {
        axios.post('http://192.168.1.109:3000/exerciseInfo?prop=exercises', props)
            .then(exercises => {
                dispatch({
                    type: types.FETCH_EXERCISES_BY_ID,
                    payload: exercises.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export const toggleExerciseDeleteListVisibility = () => {
    return {
        type: types.TOGGLE_DELETE_EXERCISE_VISIBILITY,
        payload: {}
    }
}

export const exerciseInfoUpdated = formProps => async dispatch => {
    let response = await axios.put(`http://192.168.1.109:3000/exerciseInfo/${formProps._id}`, formProps);
    dispatch({
        type: types.TOGGLE_EXERCISE_VISIBILITY,
        payload: {}
    })
}

export const exerciseInfoDelete = id => async dispatch => {
    await axios.delete(`http://192.168.1.109:3000/exerciseInfo/${id}`);
    dispatch({
        type: types.TOGGLE_DELETE_EXERCISE_VISIBILITY,
        payload: {}
    })
}

export const toggleExerciseVisibility = () => {
    return {
        type: types.TOGGLE_EXERCISE_VISIBILITY,
        payload: {}
    }
}

export const exerciseInfoVisibility = (id) => {
    return {
        type: types.TOGGLE_EDIT_INFO,
        payload: id
    }
}

export const exerciseInfoClose = () => {
    return {
        type: types.CLOSE_EDIT_INFO
    }
}

export const editExerciseText = ({ text, type }) => {
    return {
        type,
        payload: text
    }
}

export const changeSetText = (props) => {
    return {
        type: props.type,
        payload: props
    }
}

export const addSetToExerciseModel = id => {
    return {
        type: types.ADD_SET,
        payload: id
    }
}