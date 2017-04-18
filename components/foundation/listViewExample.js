import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, ListView, TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import SmallList from './smallListItem';
import * as actions from '../../actions';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class ListViewExample extends Component {
    constructor(props) {
        super(props);
        this.props.fetchExercises();
    }

    renderListView = () => {
        return (
            <ListView
                enableEmptySections
                dataSource={this.props.listData}
                renderRow={(exercise) => this.renderRow(exercise)}
            />
        ) 
    }

    renderRow = (exercise) => {
        return (
            <SmallList
                moreIcon={require('../../images/circleMore.png')}
                lessIcon={require('../../images/lessCircle.png')}
                onSelect={this.props.onSelect}
                id={exercise._id}
                onMoreInfo={this.props.exerciseInfoVisibility}
                moreInfoId={this.props.setup_exercises.exerciseEdit.moreInfoId}
                rightIcon={this.props.rightIcon}
                {...exercise}
            />
        )
    }

    render() {
        return (
        <View style={styles.container}>
            {this.renderListView()}
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        borderWidth: 1,
        borderColor: 'silver',
        borderRadius: 3
    }
})

const mapStateToProps = (state) => {
    const { setup_exercises } = state;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
        setup_exercises,
        listData: ds.cloneWithRows(setup_exercises.exercises)
    }
}

export default connect(mapStateToProps, actions)(ListViewExample);