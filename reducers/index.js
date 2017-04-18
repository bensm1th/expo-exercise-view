import { combineReducers } from 'redux';
import setup_exercises from './setup_exercises_reducer';
import setup_workouts from './setup_workouts_reducer';
export default combineReducers({
    banana: () => 'banana',
    setup_exercises,
    setup_workouts
});