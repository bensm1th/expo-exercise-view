import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, UIManager, LayoutAnimation, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Icon, FormLabel } from 'react-native-elements';
import { v4 } from 'uuid';
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip';
import ListTitle from '../components/foundation/listTitle';
import StepFour from '../components/foundation/createWorkout/StepFour';
import FinalExercises from '../components/foundation/createWorkout/FinalExercises';
import PeriodInfo from '../components/foundation/stats/PeriodInfo';
import * as actions from '../actions';
import colors from '../colors';

let SCREEN_HEIGHT = Dimensions.get('window').height;
let SCREEN_WIDTH = Dimensions.get('window').width;
        
const getDay = date => moment(date).format('MMMM Do');
const getWeek = date => {
    const weekStart = moment(date).startOf('week').format('MMMM Do');
    const weekStop = moment(date).endOf('week').format('MMMM Do');
    return `${weekStart} - ${weekStop}`;
};
const getMonth = date => moment(date).startOf('month').format('MMM YYYY');
const makeWorkoutsInfo = (workouts, _day, _week, _month) => {
    return workouts.reduce((init, workout) => {
            // day
            if (getDay(workout.updatedAt) === _day.day) {
                init.day.points = init.day.points + workout.pointsEarned;
                init.day.workouts = [...init.day.workouts, workout];
            }
            // week
            if (getWeek(workout.updatedAt) === getWeek(_week.date)) {
                init.week.points = init.week.points + workout.pointsEarned;
                init.week.workouts = [...init.week.workouts, workout];
            }
            // month
            if (getMonth(workout.updatedAt) === getMonth(_month.date)) {
                init.month.points = init.month.points + workout.pointsEarned;
                init.month.workouts = [...init.month.workouts, workout];
            }
            return init;
        }, { 
        day: { points: 0, workouts: [] }, 
        week: { points: 0, workouts: [] }, 
        month: { points: 0, workouts: [] } 
    });
};

class StatsScreen extends Component {

    static navigationOptions = {
        title: 'Stats',
        tabBar: {
            icon: ({ tintColor }) => {
                return (
                    <Icon 
                        name="show-chart"
                        size={30}
                        color={'white'}
                        iconStyle={{ marginTop: 10, marginBottom: 3 }}
                    />);
            }
        }
    }

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const today = moment();
        this.props.setSelectedDay(getDay(today), today);
        this.props.setSelectedWeek(getWeek(today), today);
        this.props.setSelectedMonth(getMonth(today), today);
        this.props.fetchCompletedWorkouts(this.props.auth.user.id);
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.easeInEaseOut();
    }

    setDay = date => {
        this.props.setSelectedWeek(getWeek(date), date);
        this.props.setSelectedDay(getDay(date), date);
        this.props.setSelectedMonth(getMonth(date), date);
    }

    setWeekAndMonth = date => {
        this.props.setSelectedWeek(getWeek(date), date);
        this.props.setSelectedMonth(getDay(date), date);
    }

    showWorkout = workout => {
        this.props.setVisibleWorkout(workout);
    }

    onBack = () => {
        this.props.statsHideWorkouts();
    }

    renderFinalExercises = () => {
        return this.props.stats.visibleWorkout.exercises.map((exercise, i) => {
            return (
                <FinalExercises 
                    key={v4()} 
                    {...exercise.exerciseInfo} 
                    index={i} 
                    sets={exercise.sets}
                    parent='stats'
                />
            );
        });
    }

    render() {
        const { selectedDay, selectedWeek, selectedMonth, visibleWorkout,
            toggleStatsVisibility, completedWorkouts, workoutVisibility } = this.props.stats;
        const info = makeWorkoutsInfo(completedWorkouts, selectedDay, selectedWeek, selectedMonth);
        return (
            <View style={styles.container}>
                <ListTitle title="Stats" />
                {workoutVisibility ? (
                    <StepFour
                        {...this.props}
                        renderFinalExercises={this.renderFinalExercises}
                        workoutInfo={{ name: visibleWorkout.name, description: visibleWorkout.description, title: 'View your completed workout.' }}
                        parent='stats'
                        onBack={this.onBack}
                        buttons={{}}
                        renderFinalExercises={this.renderFinalExercises}
                        pointsEarned={visibleWorkout.pointsEarned}
                    />
                ) : (
                <View style={styles.statsContainer}>
                    <CalendarStrip 
                        calendarAnimation={{type: 'sequence', duration: 30}}
                        daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                        style={styles.calendarStyle}
                        calendarHeaderStyle={{color: 'white'}}
                        calendarColor={colors.secondary.light}
                        dateNumberStyle={{color: 'white'}}
                        dateNameStyle={{color: 'white'}}
                        highlightDateNumberStyle={{color: 'yellow'}}
                        highlightDateNameStyle={{color: 'yellow'}}
                        disabledDateNameStyle={colors.primary.medium}
                        disabledDateNumberStyle={colors.primary.medium}
                        iconContainer={{flex: 0.1}}    
                        onDateSelected={date => this.setDay(date)}
                        onWeekChanged={week => this.setWeekAndMonth(week)}
                        weekendDateNameStyle={{ color: colors.primary.dark }}
                        weekendDateNumberStyle={{ color: colors.primary.dark }}                    
                    />
                    <View style={styles.directions}>
                        <Text style={styles.directionsText}>View Stats</Text>
                    </View>
                    <View style={styles.periodInfoContainer}>
                        <PeriodInfo 
                            setToggleStatsVisibility={this.props.toggleStatsVisibility}
                            selectedPeriod={selectedDay}
                            toggleStatsVisibility={toggleStatsVisibility}
                            info={info}
                            period='day'
                            showWorkout={this.showWorkout}
                        />
                        <PeriodInfo 
                            setToggleStatsVisibility={this.props.toggleStatsVisibility}
                            selectedPeriod={selectedWeek}
                            toggleStatsVisibility={toggleStatsVisibility}
                            info={info}
                            period='week'
                            showWorkout={this.showWorkout}
                        />
                        <PeriodInfo 
                            setToggleStatsVisibility={this.props.toggleStatsVisibility}
                            selectedPeriod={selectedMonth}
                            toggleStatsVisibility={toggleStatsVisibility}
                            info={info}
                            period='month'
                            showWorkout={this.showWorkout}
                        />
                    </View>
                </View>
                )}
            </View>
        );
    }
}
const mapStateToProps = state => {
    const { stats, auth } = state;
    return { 
        stats, 
        auth,
        workouts: stats.completedWorkouts,
        mostRecent: stats.mostRecent
    };
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background.medium,
        height: SCREEN_HEIGHT,
    },
    calendarStyle: {
        paddingTop: 20, 
        paddingBottom: 10, 
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.light,
        width: SCREEN_WIDTH - 2
    },
    directions: {
        marginTop: 15,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    directionsText: {
        fontSize: 20
    },
    statsContainer: {
        backgroundColor: colors.background.white,
        borderColor: colors.border.light,
        borderWidth: 1,
    },
    labelContainer: {
        height: SCREEN_HEIGHT * 0.07,
        backgroundColor: colors.secondary.dark,
        borderColor: colors.border.light,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelText: {
        color: 'white',
        fontSize: 20
    },
    timePeriodContainer: {

    },
    workoutRowA: {
        backgroundColor: colors.background.medium,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    workoutRowB: {
        backgroundColor: colors.background.light,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    workoutsLabel: {
        backgroundColor: colors.primary.light,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});

export default connect(mapStateToProps, actions)(StatsScreen);
