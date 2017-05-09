import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import colors from '../../../colors';

let SCREEN_HEIGHT = Dimensions.get('window').height;
let SCREEN_WIDTH = Dimensions.get('window').width;

const PeriodInfo = props => {
    const { period } = props;
    const iconName = props.toggleStatsVisibility === period ? 'expand-less' : 'expand-more';
    return (
        <View style={styles.timePeriodContainer}>
            <TouchableOpacity onPress={() => props.setToggleStatsVisibility(period)}>  
                <View style={styles.labelContainer}>
                    <Icon 
                        name={iconName}
                        size={40}
                        color={colors.background.white}
                        iconStyle={styles.iconStyle}
                    />
                    <Text style={styles.labelText}>By {period}: {props.selectedPeriod[period]}</Text>
                </View>
            </TouchableOpacity>
            {props.toggleStatsVisibility === period &&
            <View>
                <View style={styles.categories}>
                    <Text>Points Earned: {props.info[period].points}</Text>
                    <Text>Workouts Completed: {props.info[period].workouts.length}</Text>
                </View>
                
                <ScrollView
                    style={styles.scrollView}
                    stickyHeaderIndices={[0]}
                >
                    <View style={styles.workoutsLabel}>
                        <Text style={styles.name}>NAME</Text>
                        <Text style={styles.points}>POINTS</Text>
                        <Text style={styles.time}>DATE</Text>
                        <Text style={styles.time}>FINISHED AT</Text>
                    </View>
                    {props.info[period].workouts.map((workout, i) => {
                        const style = (i % 2 === 0) ? styles.workoutRowA : styles.workoutRowB;
                        const updateTime = moment(workout.updatedAt).format('h:mm a');
                        return (
                            <TouchableOpacity
                                key={workout._id}
                                onPress={() => props.showWorkout(workout)}
                            >  
                                <View style={style}>
                                    <Text style={styles.name}>{workout.name}</Text>
                                    <Text style={styles.points}>     {workout.pointsEarned}</Text>
                                    <Text style={styles.time}>{moment(workout.updatedAt).format('M [/] D')}</Text>
                                    <Text style={styles.time}>{updateTime}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    iconStyle: {
        marginLeft: SCREEN_WIDTH * 0.05
    },
    name: {
        width: SCREEN_WIDTH * 0.35
    },
    points: {
        width: SCREEN_WIDTH * 0.2
    },
    time: {
        width: SCREEN_WIDTH * 0.2
    },
    labelContainer: {
        height: SCREEN_HEIGHT * 0.07,
        backgroundColor: colors.secondary.dark,
        borderColor: colors.border.light,
        borderWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    categories: {
        height: SCREEN_HEIGHT * 0.06,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    labelText: {
        color: 'white',
        fontSize: 20,
        marginLeft: SCREEN_WIDTH * 0.08
    },
    timePeriodContainer: {

    },
    workoutRowA: {
        backgroundColor: colors.background.medium,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: SCREEN_HEIGHT * 0.05,
        paddingLeft: SCREEN_WIDTH * 0.02
    },
    workoutRowB: {
        backgroundColor: colors.background.light,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: SCREEN_HEIGHT * 0.05,
        paddingLeft: SCREEN_WIDTH * 0.02
    },
    workoutsLabel: {
        backgroundColor: colors.secondary.medium,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: SCREEN_WIDTH * 0.02
    },
    scrollView: {
        maxHeight: SCREEN_HEIGHT * 0.3
    },
});

export default PeriodInfo;
