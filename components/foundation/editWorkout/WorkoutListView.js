import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, ListView, TouchableOpacity, Dimensions } from 'react-native';
import SmallList from '../smallListItem';
import * as actions from '../../../actions';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;

const createInfoText = workout => {
    return [{ label: 'Description', text: workout.description }]
};

class WorkoutListView extends Component {
    constructor(props) {
        super(props);
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
        let infoText = createInfoText(workout);
        return (
            <SmallList
                moreIcon={require('../../../images/circleMore.png')}
                lessIcon={require('../../../images/lessCircle.png')}
                id={workout._id}
                moreInfoId={this.props.edit_workouts.moreInfoId}
                onMoreInfo={this.props.workoutInfoVisibility}
                onSelect={this.props.workoutEditVisibility}
                rightIcon={this.props.rightIcon}
                {...workout}
                infoText={infoText}
            />
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderListView()}
            </View>
        );
    }
}

mapStateToProps = state => {
    const { edit_workouts } = state;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
        edit_workouts,
        listData: ds.cloneWithRows(edit_workouts.workouts)
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 3
    }
});

export default connect(mapStateToProps, actions)(WorkoutListView);

