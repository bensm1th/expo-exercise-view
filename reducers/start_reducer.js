import * as types from '../actions/types';


const changeStartWorkout = exercises => exercises.map(exercise => {
    const newSets = exercise.sets.map(set => ({ ...set, actual: { weight: '', number: '' } }));
    return { ...exercise, sets: newSets };
});

const changedStartedWorkoutText = (field, state, payload) => { 
    let both = {};
    const exercises = state.startedWorkout.exercises.map(exercise => {
        if (exercise._id === state.openedExercise._id) {
            const changedSets = exercise.sets.map(set => {
                if (set._id === state.openedSet._id) {
                    set = { ...set, actual: { ...set.actual, [field]: payload } };
                    both = set;
                    return set;
                }
                return set;
            });
            return { ...exercise, sets: changedSets };
        }
        return exercise;
    });
    return { exercises, both };
};
const changeActualSet = (type, state, action) => {
    const changeText = changedStartedWorkoutText(type, state, action.payload);
    const vars = textVars(changeText.both);
    const repeated = state.finishedSets.some(id => id === vars._id);
    let finishedSets;
    if (!vars.setFinished && !repeated) {
        finishedSets = state.finishedSets;
    }
    if (vars.setFinished && !repeated) {
        finishedSets = [...state.finishedSets, vars._id];
    }
    if (!vars.setFinished && repeated) {
        //here is where I'll have to take one out
        const filterOutUnfinished = state.finishedSets.filter(id => {
            return id !== vars._id;
        });
        finishedSets = filterOutUnfinished;
    }
    if (vars.setFinished && repeated) {
        finishedSets = state.finishedSets;
    } 
    return {
            ...state,
            startedWorkout: {
                ...state.startedWorkout,
                exercises: changeText.exercises
            },
            finishedSets
        };
};

const selectEditOpenSet = (state, action) => {
    let openedSet;
    if (state.openedSet._id === action.payload._id) {
        openedSet = initialState.openedSet;
    } else {
        openedSet = action.payload;
    }
    return {
        ...state,
        openedSet
    };
};

const textVars = props => {
    const { _id, actual: { number, weight } } = props;
    const setFinished = number.length > 0 && weight.length > 0;
    return {
        setFinished,
        _id
    };
};

const selectOpenExercise = (state, action) => {
    let openedExercise;
    if (state.openedExercise._id === action.payload._id) {
        openedExercise = initialState.openedExercise;
    } else {
        openedExercise = action.payload;
    }
    return {
        ...state,
        openedExercise
    };
};
const selectStartWorkout = (state, action) => {
    const startedExercises = changeStartWorkout(action.payload.exercises);
    const startedWorkout = { ...action.payload, exercises: startedExercises };
    return {
        ...state,
        startedWorkout,
        startStep: 1
    };
};

const initialState = {
    workoutStarted: false,
    startedWorkout: {

    },
    startStep: 0,
    openedExercise: { sets: [] },
    openedSet: {},
    finishedSets: [],
    startTime: '',
    paused: {
        isPaused: false,
        elapsedDuration: '0:0'
    }
};

export default start_reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.CANCEL_START_WORKOUT: 
            return initialState;
        case types.SEND_PAUSE_TIME: {
            return {
                ...state,
                paused: {
                    ...state.paused,
                    elapsedDuration: action.payload
                }
            };
        }
        case types.FINISH_WORKOUT:
            return initialState;
        case types.RESUME_WORKOUT:
            return {
                ...state,
                paused: {
                    ...state.paused,
                    isPaused: false,
                },
                startTime: action.payload
            };
        case types.PAUSE_WORKOUT:
            return {
                ...state,
                paused: {
                    ...state.paused,
                    isPaused: true,
                }
            };
        case types.CHANGE_ACTUAL_SET_REPS:
            return changeActualSet('number', state, action);   
        case types.CHANGE_ACTUAL_SET_WEIGHT:
            return changeActualSet('weight', state, action);
        case types.EDIT_OPEN_SET:
            return selectEditOpenSet(state, action);
        case types.OPEN_EXERCISE:
            return selectOpenExercise(state, action);
        case types.START_WORKOUT:
            return {
                ...state,
                workoutStarted: true,
                startStep: state.startStep + 1,
                startTime: action.payload
            };
        case types.DEC_START_STEP:
            return {
                ...state,
                startStep: state.startStep - 1
            };
        case types.SELECT_START_WORKOUT:
            return selectStartWorkout(state, action);
        default:
            return state;
    }
};

