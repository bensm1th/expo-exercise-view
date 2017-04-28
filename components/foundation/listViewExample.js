import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, ListView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import SmallList from './smallListItem';
import * as actions from '../../actions';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const createInfoText = exercise => {
    return Object.keys(exercise).reduce((initial, current) => {
            const first = current.substr(0, 1);
            if (first !== '_') {
                const label = first.toUpperCase() + current.substr(1);
                initial = [...initial, { label, text: exercise[current]}]
            }
        return initial;
    }, [])
};

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
        const infoText = createInfoText(exercise);
        return (
            <SmallList
                onSelect={this.props.onSelect}
                id={exercise._id}
                onMoreInfo={this.props.exerciseInfoVisibility}
                moreInfoId={this.props.setup_exercises.exerciseEdit.moreInfoId}
                rightIcon={this.props.rightIcon}
                {...exercise}
                infoText={infoText}
            />
        )
    }

    render() {
        return (
        <View style={styles.container}>
            {this.props.setup_exercises.exercises.length === 0 ? (
            <View>
                <ActivityIndicator
                    animating={!this.props.setup_exercises.exercises.length}
                    style={styles.centering}
                    size='large'
                />
                </View>
            ): (
            <View>
                {this.renderListView()}
            </View>)
            }
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
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        height: 80
    },
});

const mapStateToProps = (state) => {
    const { setup_exercises } = state;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
        setup_exercises,
        listData: ds.cloneWithRows(setup_exercises.exercises)
    }
}

export default connect(mapStateToProps, actions)(ListViewExample);