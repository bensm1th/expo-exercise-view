import * as types from '../actions/types';
import { v4 } from 'uuid';

const changeSetText = (props, field, state) => {
    const { text, id, exerciseId } = props;
        const findField = state.populatedExercises.map(_exercise => {
            if (_exercise.exerciseInfo._id === exerciseId) {
                const newSets = _exercise.sets.map(set => {
                    if (set._id === id) {
                        if (field === 'reps') {
                            set.reps = text;
                        }
                        if (field === 'weight') {
                            set.weight = text;
                        }
                    }
                    return set
                });
                _exercise.sets = [...newSets]
            }
            return _exercise;
        });
        return findField;
}

const addSet = (props, state) => {
    return updatedExercises1 = state.populatedExercises.map(exerciseModel => {
        if (exerciseModel.exerciseInfo._id === props) {
            const _id = v4();
            exerciseModel.sets = [...exerciseModel.sets, { weight: '', reps: '', _id }];
            exerciseModel.setsVisibility = true;
            exerciseModel.setsSaved = false;
        }
        return exerciseModel;
    });
}

const toggleExerciseCheck = (props, state) => {
    let updatedExercises;
    const { exercises } = state;
    const filteredExercises = exercises.filter(exercise => {
        return exercise !== props;
    });
    if (exercises.length !== filteredExercises.length) {
        return updatedExercises = filteredExercises;
    }
    else {
        return updatedExercises = [...exercises, props];
    }
}

const toggleSetsView = (props, exercises) => {
    return exercises.map(exercise => {
        if (exercise.exerciseInfo._id === props) {
            exercise.setsVisibility = !exercise.setsVisibility;
            exercise.setsSaved = true;
        }
        return exercise;
    });
}

const deleteSet = (props, exercises) => {
    return exercises.map(exercise => {
        if (exercise.exerciseInfo._id === props.exerciseId) {
            exercise.sets = exercise.sets.filter(set => {
                return set._id !== props.setId
            });
            if (exercise.sets.length === 0) {
                exercise.setsVisibility = false;
                exercise.setsSaved = false;
            }
        }
        return exercise;
    });
}
const removeDeletedExercises = (exercises, deleteExercises) => {
    return exercises
    .map(exercise => {
        const sets = exercise.sets.map(set => {
            return { 
                weight: set.goals.weight.toString(), 
                reps: set.goals.number.toString(), 
                _id: set._id 
            }
        });
        return { exerciseInfo: exercise.exerciseInfo, sets, setsVisibility: false, setsSaved: false }
    })
    .filter(exercise => {
        return !deleteExercises.some(_id => {
            return _id === exercise._id
        });
    });
}
const initialState = {
    createForm: {
        name: "",
        description: ""
    },
    createStep: 1,
    exercises: [],
    populatedExercises: [],
    editWorkout: false,
    errorMessage: ""
}

const setupWorkoutsReducer = (state = initialState, action = {}) => {
    switch(action.type) {
        case types.ERROR_WORKOUT_CREATE:
        return {
            ...state,
            errorMessage: action.payload
        }
        case types.SET_CREATE_STEP: 
            return {
                ...state,
                createStep: 1
            }
        case types.EDIT_ADD_EXERCISES:
            
            const { newExercises, deleteExercises, currentWorkout: { name, description, exercises } } = action.payload;            
            const removeDeleted = removeDeletedExercises(exercises, deleteExercises)
            
            const currentExercises = [...newExercises, ...removeDeleted];

            return {
                ...state,
                populatedExercises: currentExercises,
                createStep: 3,
                editWorkout: true,
                createForm: { name, description }
            }
        case types.SAVE_WORKOUT:
            return initialState;
        case types.DELETE_SET:
            const deletedSet = deleteSet(action.payload, [...state.populatedExercises]);
            return {
                ...state,
                populatedExercises: [
                    ...deletedSet
                ]
            }
        case types.TOGGLE_SETS_VIEW:
            const toggledSets = toggleSetsView(action.payload, [...state.populatedExercises]);
            return {
                ...state,
                populatedExercises: [
                    ...toggledSets
                ]
            }
        case types.CHANGE_SET_REPS_TEXT:
            const changeReps = changeSetText(action.payload, 'reps', state);
            return {
                ...state,
                populatedExercises: [
                    ...changeReps
                ]
            }
        case types.CHANGE_SET_WEIGHT_TEXT:
            const changeWeight = changeSetText(action.payload, 'weight', state);
            return {
                ...state,
                populatedExercises: [
                    ...changeWeight
                ]
            }
        case types.ADD_SET:
            const addSetToExercise = addSet(action.payload, state);
            return {
                ...state,
                populatedExercises: [
                    ...addSetToExercise
                ]
            }
        case types.FETCH_EXERCISES_BY_ID:
            const exerciseModel = action.payload.map(exercise => {
                return { exerciseInfo: exercise, sets: []}
            });
            return {
                ...state,
                populatedExercises: [
                    ...exerciseModel
                ]
            }
        case types.TOGGLE_EXERCISE_CHECK:
            const toggledExercises = toggleExerciseCheck(action.payload, state);
            return {
                ...state,
                exercises: [
                    ...toggledExercises
                ]
            }
        case types.CHANGE_WORKOUT_NAME:
            return {
                ...state,
                createForm: {
                    ...state.createForm,
                    name: action.payload
                }
            }
        case types.CHANGE_WORKOUT_DESCRIPTION:
            return {
                ...state,
                createForm: {
                    ...state.createForm,
                    description: action.payload
                }
            }
        case types.INCREMENT_CREATE_WORKOUT_STEP:
            return {
                ...state,
                createStep: state.createStep + 1
            }
        case types.DECREMENT_CREATE_WORKOUT_STEP:
            return {
                ...state,
                createStep: state.createStep - 1
            }
        default:
            return state;
    }
}

export default setupWorkoutsReducer;