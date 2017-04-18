import * as types from '../actions/types';
import { v4 } from 'uuid';

const initialState = {
    createForm: {
        name: "",
        description: ""
    },
    setsForm: {
        weight: '',
        reps: ''
    },
    setsQuantity: '',
    createStep: 1,
    exercises: [],
    populatedExercises: [],
}
const changeSetText = (props, field, state) => {
    const { text, id, exerciseId } = props;
        const findRep = state.populatedExercises.map(_exercise => {
            if (_exercise.exerciseInfo._id === exerciseId) {
                const newSets = _exercise.sets.map(set => {
                    if (set.id === id) {
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
        return findRep;
}

const addSet = (props, state) => {
    return updatedExercises1 = state.populatedExercises.map(exerciseModel => {
        if (exerciseModel.exerciseInfo._id === props) {
            const id = v4();
            exerciseModel.sets = [...exerciseModel.sets, { weight: '', reps: '', id }]
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

const setupWorkoutsReducer = (state = initialState, action = {}) => {
    switch(action.type) {
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