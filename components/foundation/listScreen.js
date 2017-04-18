import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { View, Text, Modal, StyleSheet, Dimensions, ListView, ScrollView, TouchableHighlight } from 'react-native';
import ListItem from './listItem';
import ListTitle from './listTitle';
import ChoiceButton from './choiceButton';
import * as actions from '../../actions';
import RNModal from 'react-native-modal';
import * as Setup from '../setup';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
let listWidth = ScreenWidth * .8;
let headerHeight = ScreenHeight * .1;
let choiceHeight = ScreenHeight * .15;
let middleHeight = ScreenHeight * .27;
let bottomHeight = ScreenHeight * .125;
let listTop = ScreenHeight * .09;
let listLeftOffset = ScreenWidth * .1;
let listItemHeight = ScreenHeight * .135;
let checkBoxLength = listItemHeight * .2;


class ListScreen extends Component {

    constructor(props) {
        super(props);
        this.state = { workoutItems: [
            { title: "Create a Workout", index: 0, icon: require('../../images/workout.png') }, 
            { title: "Edit a Workout", index: 1,  icon: require('../../images/edit.png')}, 
            { title: "Delete a Workout", index: 2, icon: require('../../images/delete.png')}
        ], exerciseItems: [
            { title: "Create an Exercise", index: 0, icon: require('../../images/workout.png') }, 
            { title: "Edit an Exercise", index: 1, icon: require('../../images/edit.png')}, 
            { title: "Delete an Exercise", index: 2, icon: require('../../images/delete.png')}
        ]};
        this.onSelect = this.onSelect.bind(this);
        this.renderListItems = this.renderListItems.bind(this);
        this.onChoiceButtonPress = this.onChoiceButtonPress.bind(this);
    }

    onSelect(index) {
        const { setupOption } = this.props.setup;
        const listData = setupOption === 'left' ? this.state.workoutItems : this.state.exerciseItems;
        const selectedListItem = listData.filter(item => {
            return item.index === index;
        });
        this.props.setupListSelect(selectedListItem[0].title);
    }


    renderListItems() {
        const { setupOption, selected } = this.props.setup;
        const listData = setupOption === 'left' ? this.state.workoutItems : this.state.exerciseItems;
        const rightIcon = require('../../images/rightarrow.png');
        return listData.map((item) => {
            return (
                <ListItem
                    onSelect={this.onSelect} 
                    listText={item.title} 
                    selected={selected}
                    key={item.index}
                    index={item.index}
                    icon={item.icon}
                    rightIcon={rightIcon}
                />
            );
        });
    }

    onChoiceButtonPress(choice) {
        this.props.setupChoice(choice);
    }

    renderModal() {
        const { selectedListItem } = this.props.setup;
        switch(selectedListItem) {
            case 'Create a Workout':
                return <Setup.CreateWorkout
                            title={selectedListItem}
                            onPress={this.props.closeModal}
                        />
                ;
            case 'Edit a Workout':
                return <Setup.EditWorkout
                            title={selectedListItem}
                            onPress={this.props.closeModal}
                        />;
            case 'Delete a Workout':
                return <Setup.DeleteWorkout
                            title={selectedListItem}
                            onPress={this.props.closeModal}
                        />;
            case 'Create an Exercise':
                return <Setup.CreateExercise
                            title={selectedListItem}
                            onPress={this.props.closeModal}
                        />;
            case 'Edit an Exercise': 
                return <Setup.EditExercise
                            title={selectedListItem}
                            onPress={this.props.closeModal}
                        />;
            case 'Delete an Exercise':
                return <Setup.DeleteExercise
                            title={selectedListItem}
                            onPress={this.props.closeModal}
                        />;
            default:
                return <Setup.CreateWorkout
                            title={selectedListItem}
                            onPress={this.props.closeModal}
                        />;
        }
    }

    render() {
        const { modalVisible, selectedListItem } = this.props.setup;
        return (
            <View style={styles.container}>
                <RNModal
                    animationIn={"slideInRight"}
                    isVisible={this.props.setup.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                    backdropOpacity={1}
                    backdropColor='white'
                    animationOut={'slideOutRight'}
                    style={styles.modal}
                >
                    <View style={{ flex: 1 }}>
                    {this.renderModal()}
                    </View>
                </RNModal>
                <ListTitle title="SETUP" />
                <View style={styles.choiceContainer}>
                    <ChoiceButton 
                        choiceOne="WORKOUTS" 
                        choiceTwo="EXERCISES"
                        selected={this.props.setup.setupOption}
                        onPress={this.onChoiceButtonPress}
                    />
                </View>
                <View style={styles.listContainer}>
                    {this.renderListItems()}
                </View>
                <View style={styles.middle}></View>
                <View style={styles.footer}></View>
            </View>

        );
    }
}

const mapStateToProps = (state) => {
    const { banana, setup } = state;
    return {
        banana, setup
    }
}

export default connect(mapStateToProps, actions)(ListScreen);

const styles = StyleSheet.create({
    container: {
        display: "flex",
    },
     choiceContainer: {
        height: choiceHeight,
        backgroundColor: "#f7f7f7",
        alignItems: 'center',
        justifyContent: 'center'
    },
    middle: {
        backgroundColor: "#f7f7f7",
        flexDirection: 'row',
        height: middleHeight
    },
    listContainer: {
        borderTopColor: "#e0e0e0",
        borderTopWidth: 1
    },
    listContainerMiddle: {
        top: ScreenHeight * .52,
        left: listLeftOffset,
        width: listWidth
    },
    footer: {
        backgroundColor: "#b90005",
        height: bottomHeight,
        flexDirection: 'row'
    },
    modal: {
        flex: 1,
        padding: 0, 
        margin: 0
    }
});
