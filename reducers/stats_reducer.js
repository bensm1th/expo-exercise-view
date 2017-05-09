import * as types from '../actions/types';

const initialState = {
    completedWorkouts: [], 
    totalPoints: 0, 
    mostRecent: {},
    selectedDay: { day: '', date: '' },
    selectedWeek: { week: '', date: '' },
    selectedMonth: { month: '', date: '' },
    toggleStatsVisibility: 'day',
    workoutVisibility: false,
    visibleWorkout: {}
};

export default stats_reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.STATS_HIDE_WORKOUTS:
            return {
                ...state,
                workoutVisibility: false,
                visibleWorkout: {}
            };
        case types.SET_VISIBLE_STATS_WORKOUT:
            return {
                ...state,
                workoutVisibility: true,
                visibleWorkout: action.payload
            };
        case types.TOGGLE_STATS_VISIBILITY:
            return {
                ...state,
                toggleStatsVisibility: action.payload
            };
        case types.SET_SELECTED_DAY:
            return {
                ...state,
                selectedDay: action.payload
            };
        case types.SET_SELECTED_WEEK:
            return {
                ...state,
                selectedWeek: action.payload
            };
        case types.SET_SELECTED_MONTH:
            return {
                ...state,
                selectedMonth: action.payload
            };
        case types.COMPLETED_WORKOUTS_FETCH:
            const totalPoints = calculateTotalPoints(action.payload);
            const mostRecent = action.payload[action.payload.length - 1];
            return {
                ...state,
                completedWorkouts: [...action.payload],
                totalPoints,
                mostRecent
            };
        default:
            return state;
    }
};

const calculateTotalPoints = workouts => {
    return workouts.reduce((init, workout) => {
        const points = workout.pointsEarned ? workout.pointsEarned : 0;
        return init + points;
    }, 0);
};

