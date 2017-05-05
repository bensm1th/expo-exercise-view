import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Timer from './timer';
import colors from '../../../colors';

let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREEN_HEIGHT = Dimensions.get('window').height;

const Status = props => {
    return (
        <View style={styles.statusContainer}>
            <View style={styles.rowContainer}>
                <View style={styles.cell}>
                    <Text style={styles.cellLabel}>EXERCISES COMPLETED</Text>
                    <Text style={styles.cellText}>{props.exercisesCompleted}</Text>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.cell}>
                    <Text style={styles.cellLabel}>POINTS EARNED</Text>
                    <Text style={styles.cellText}>{props.pointsEarned}</Text>
                </View>
            </View>
            <View style={styles.horizontalDivider} />
            <View style={styles.rowContainer}>
                <View style={styles.cell}>
                    <Text style={styles.cellLabel}>SETS COMPLETED</Text>
                    <Text style={styles.cellText}>{props.setsCompleted}</Text>
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.cell}>
                    <Text style={styles.cellLabel}>DURATION</Text>
                    <Timer />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statusContainer: {
        flexDirection: 'column'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        padding: 8
    },
    cell: {
        flex: 0.5,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: colors.text.coalmine
    },
    cellText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.text.coalmine,
    },
    verticalDivider: {
        backgroundColor: colors.border.light,
        height: 45,
        width: 1
    },
    horizontalDivider: {
        backgroundColor: colors.border.light,
        height: 1
    }
});

export default Status;
