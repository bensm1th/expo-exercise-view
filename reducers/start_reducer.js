import * as types from '../actions/types';


const changeStartWorkout = exercises => {
    const newExercises = exercises.map(exercise => {
        const newSets = exercise.sets.map(set => {
            return {...set, actual: { weight: '', number: ''}}
        });
        return {...exercise, sets: newSets}
    });
    return newExercises;
}

const changedStartedWorkoutText = (exercises, field) => { 
    return exercises.map(exercise => {
        if (exercise._id === state.openedExercise._id) {
            const changedSets = exercise.sets.map(set => {
                if (set._id === openedSet._id) {
                    return {...set, actual: {...set.actual, [field]: action.payload }}
                }
                return set;
            });
            return {...exercise, sets: changedSets}
        }
        return exercise;
    });
}

const initialState = {
    workoutStarted: false,
    startedWorkout: {

    },
    startStep: 0,
    openedExercise: { sets: []},
    openedSet: {}
}

export default start_reducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case types.CHANGE_ACTUAL_SET_REPS:
            const changeReps = changedStartedWorkoutText(state.startedWorkout.exercises, 'number');
            return {
                ...state,
                startedWorkout: {
                    ...state.startedWorkout,
                    exercises: changeReps
                }
            }
        case types.CHANGE_ACTUAL_SET_WEIGHT:
            const changeWeight = changedStartedWorkoutText(state.startedWorkout.exercises, 'weight');
            return {
                ...state,
                startedWorkout: {
                    ...state.startedWorkout,
                    exercises: changeWeight
                }
            }
        case types.EDIT_OPEN_SET:
            let openedSet;
            if (state.openedSet._id === action.payload._id) {
                openedSet = initialState.openedSet;
            } else {
                openedSet = action.payload;
            }
            return {
                ...state,
                openedSet: openedSet
            }
        case types.OPEN_EXERCISE:
            let openedExercise;
            if (state.openedExercise._id === action.payload._id) {
                openedExercise = initialState.openedExercise;
            } else {
                openedExercise = action.payload;

            }
            return {
                ...state,
                openedExercise: openedExercise
            }
        case types.START_WORKOUT:
            return {
                ...state,
                workoutStarted: true,
                startStep: state.startStep + 1
            }
        case types.DEC_START_STEP:
            return {
                ...state,
                startStep: state.startStep - 1
            }
        case types.SELECT_START_WORKOUT:
            const startedExercises = changeStartWorkout(action.payload.exercises);
            const startedWorkout = {...action.payload, exercises: startedExercises}
            return {
                ...state,
                startedWorkout: startedWorkout,
                startStep: 1
            }
        default:
            return state;
    }
}

