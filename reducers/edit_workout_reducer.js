import * as types from '../actions/types';

const initialState = {
    exerciseEditOption: 'left',
    workouts: [],
    selectedWorkout: {
        name: '',
        description: '',
        exercises: []
    },
    unselectedExercises: [],
    moreInfoId: '',
    editStep: 0,
    exercises: [],
    deleteMoreInfoId: '',
    deleteExercises: [],
    addExercises: []
}

const toggleDeleteExerciseCheck = (props, state) => {
    let updatedExercises;
    const { deleteExercises } = state;
    const filteredExercises = deleteExercises.filter(exercise => {
        return exercise !== props;
    });
    if (deleteExercises.length !== filteredExercises.length) {
        return updatedExercises = filteredExercises;
    }
    else {
        return updatedExercises = [...deleteExercises, props];
    }
}

const editWorkoutsReducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case types.PUSH_TO_DELETE_ARRAY:
            const toggledExercises = toggleDeleteExerciseCheck(action.payload, state);
            return {
                ...state,
                deleteExercises: [
                    ...toggledExercises
                ]
            }
        case types.TOGGLE_DELETE_INFO:
            const deleteMoreInfoId = state.deleteMoreInfoId === action.payload ? '' : action.payload;
            return {
                ...state,
                deleteMoreInfoId: deleteMoreInfoId
            }
        case types.FETCH_EXERCISES: 
            return {
                ...state,
                exercises: action.payload
            }
        case types.EXERCISE_EDIT_OPTION:
            return {
                ...state,
                exerciseEditOption: action.payload
            }
        case types.INCREMENT_EDIT_STEP:
            return {
                ...state,
                editStep: state.editStep + 1,
                moreInfoId: ''
            }
        case types.DECREMENT_EDIT_STEP:
            return {
                ...state,
                editStep: state.editStep - 1,
                moreInfoId: ''
            }
        case types.FETCH_WORKOUTS:
            return {
                ...state,
                workouts: action.payload
            }
        case types.TOGGLE_WORKOUT_VISIBILITY:
            let selectedWorkout = state.workouts.filter(workout => {
                return workout._id === action.payload;
            })[0];
            selectedWorkout = selectedWorkout ? selectedWorkout : [];
            return {
                ...state,
                selectedWorkout,
                editStep: state.editStep + 1
            }
        case types.TOGGLE_WORKOUT_INFO:
            const moreInfoId = state.moreInfoId === action.payload ? '' : action.payload;
            return {
                ...state,
                moreInfoId
            }
        default:
            return state;
    }
}

export default editWorkoutsReducer;