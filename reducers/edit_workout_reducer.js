import * as types from '../actions/types';

const toggleExerciseCheck = (action, state) => {
    let updatedExercises;
    const { deleteExercises, addExercises } = state;
    const exercises = action.type === types.PUSH_TO_ADD_ARRAY ? addExercises : deleteExercises;
    const filteredExercises = exercises.filter(exercise => {
        return exercise !== action.payload;
    });
    if (exercises.length !== filteredExercises.length) {
        return updatedExercises = filteredExercises;
    }
    else {
        return updatedExercises = [...exercises, action.payload];
    }
}

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
    addExercises: [],
    addExercisesPopulated: []
}

const editWorkoutsReducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case types.SAVE_WORKOUT:
            return initialState;
        case types.GET_EDIT_ADD_EXERCISES:
            const populatedExercises = state.exercises.filter(exercise => {
                return state.addExercises.some(_id => _id === exercise._id);
            })
            .map(exercise => {
                return {
                    exerciseInfo: exercise,
                    sets: []
                }
            });
            return {
                ...state,
                addExercisesPopulated: populatedExercises,
                editStep: state.editStep + 1
                
            }
        case types.REMOVE_EXERCISES_WORKOUT:
            const updatedWorkoutExercises = state.selectedWorkout.exercises.filter(exercise => {
                return !state.deleteExercises.some(_exercise => _exercise === exercise._id);
            });
            return {
                ...state,
                selectedWorkout: {
                    ...state.selectedWorkout,
                    exercises: [
                        ...updatedWorkoutExercises
                    ]
                }
            }
        case types.PUSH_TO_ADD_ARRAY:
            const toggledExercisesAdd = toggleExerciseCheck(action, state);
            return {
                ...state,
                addExercises: [
                    ...toggledExercisesAdd

                ]
            }
        case types.PUSH_TO_DELETE_ARRAY:
            const toggledExercisesDelete = toggleExerciseCheck(action, state);
            return {
                ...state,
                deleteExercises: [
                    ...toggledExercisesDelete
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