import { combineReducers } from 'redux';
import setup_exercises from './setup_exercises_reducer';
import setup_workouts from './setup_workouts_reducer';
import edit_workouts from './edit_workout_reducer';
import start from './start_reducer';

export default combineReducers({
    setup_exercises,
    setup_workouts,
    edit_workouts,
    start
});