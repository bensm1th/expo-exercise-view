import { combineReducers } from 'redux';
import setup_exercises from './setup_exercises_reducer';
import setup_workouts from './setup_workouts_reducer';
import edit_workouts from './edit_workout_reducer';

export default combineReducers({
    banana: () => 'banana',
    setup_exercises,
    setup_workouts,
    edit_workouts
});