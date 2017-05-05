import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ListView, Dimensions, ActivityIndicator } from 'react-native';
import SmallList from '../smallListItem';
import * as actions from '../../../actions';
import colors from '../../../colors';

let SCREEN_HEIGHT = Dimensions.get('window').height;
let SCREEN_WIDTH = Dimensions.get('window').width;

const excludeFinishedWorkouts = workouts => workouts.filter(workout => !workout.finished);

const createInfoText = workout => [{ label: 'Description', text: workout.description }];

class WorkoutListView extends Component {

    componentDidMount() {
        this.props.fetchWorkouts();
    }

    renderListView = () => {
        return (
            <ListView
                enableEmptySections
                dataSource={this.props.listData}
                renderRow={(workout) => this.renderRow(workout)}
            />
        );
    }

    renderRow = (workout) => {
        const infoText = createInfoText(workout);
        const onSelect = this.props.parent === 'start' ? this.props.selectStartWorkout : this.props.workoutEditVisibility;
        return (
            <SmallList
                id={workout._id}
                moreInfoId={this.props.edit_workouts.moreInfoId}
                onMoreInfo={this.props.workoutInfoVisibility}
                onSelect={onSelect}
                rightIcon={this.props.rightIcon}
                {...workout}
                workout={workout}
                infoText={infoText}
                parent={this.props.parent}
            />
        );
    }

    render() {
        const waiting = this.props.edit_workouts.workouts.length === 0;
        return (
            <View style={styles.container}>
                {!waiting &&
                <View>
                    {this.renderListView()}
                </View>
                    
                }
                {waiting &&
                <View>
                <ActivityIndicator
                    animating={!this.props.edit_workouts.workouts.length}
                    style={styles.centering}
                    size='large'
                />
                </View>
                }
            </View>
        );
    }
}

const mapStateToProps = state => {
    const { edit_workouts } = state;
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return {
        edit_workouts,
        listData: ds.cloneWithRows(excludeFinishedWorkouts(edit_workouts.workouts))
    };
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background.light,
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 3
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        height: 80
    }
});

export default connect(mapStateToProps, actions)(WorkoutListView);

