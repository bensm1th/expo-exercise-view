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

const changedStartedWorkoutText = (field, state, payload) => { 
    let both = {};
    const exercises = state.startedWorkout.exercises.map(exercise => {
        if (exercise._id === state.openedExercise._id) {
            const changedSets = exercise.sets.map(set => {
                if (set._id === state.openedSet._id) {
                    set = {...set, actual: {...set.actual, [field]: payload }};
                    both = set;
                    return set;
                }
                return set;
            });
            return {...exercise, sets: changedSets}
        }
        return exercise;
    });
    return { exercises, both };
}

const textVars = props => {
    const { _id, actual: { number, weight } } = props;
    const setFinished = number.length > 0 && weight.length > 0;
    return {
        setFinished,
        _id
    }
}

const initialState = {
    workoutStarted: false,
    startedWorkout: {

    },
    startStep: 0,
    openedExercise: { sets: []},
    openedSet: {},
    finishedSets: []
}

export default start_reducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case types.CHANGE_ACTUAL_SET_REPS:
            const changeReps = changedStartedWorkoutText('number', state, action.payload);
            const repsVars = textVars(changeReps.both);
            const repeatedReps = state.finishedSets.some(id => id === repsVars._id);
            let repsFinishedSet;
            if (!repsVars.setFinished && !repeatedReps) {
                repsFinishedSet = state.finishedSets;
            }
            if (repsVars.setFinished && !repeatedReps) {
                repsFinishedSet = [...state.finishedSets, repsVars._id];
            }
            if (!repsVars.setFinished && repeatedReps) {
                //here is where I'll have to take one out
                const filterOutUnfinished = state.finishedSets.filter(id => {
                    return id !== repsVars._id;
                })
                repsFinishedSet = filterOutUnfinished;
            }
            if (repsVars.setFinished && repeatedReps) {
                repsFinishedSet = state.finishedSets;
            }       
            return {
                ...state,
                startedWorkout: {
                    ...state.startedWorkout,
                    exercises: changeReps.exercises
                },
                finishedSets: repsFinishedSet
            }

        case types.CHANGE_ACTUAL_SET_WEIGHT:
            const changeWeight = changedStartedWorkoutText('weight', state, action.payload);
            const weightVars = textVars(changeWeight.both);
            let weightFinishedSet;
            const repeatedWeight = state.finishedSets.some(id => id === weightVars._id);
            if (!weightVars.setFinished && !repeatedWeight) {
                weightFinishedSet = state.finishedSets;
            }
            if (weightVars.setFinished && !repeatedWeight) {
                weightFinishedSet = [...state.finishedSets, repsVars._id];
            }
            if (!weightVars.setFinished && repeatedWeight) {
                //here is where I'll have to take one out
                const filterOutUnfinished = state.finishedSets.filter(id => {
                    return id !== repsVars._id;
                })
                weightFinishedSet = filterOutUnfinished;
            }
            if (weightVars.setFinished && repeatedWeight) {
                weightFinishedSet = state.finishedSets;
            }     
            return {
                ...state,
                startedWorkout: {
                    ...state.startedWorkout,
                    exercises: changeWeight.exercises
                },
                finishedSets: weightFinishedSet
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

