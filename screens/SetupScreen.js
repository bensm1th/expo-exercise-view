import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import ListItem from '../components/foundation/listItem';
import ListTitle from '../components/foundation/listTitle';
import ChoiceButton from '../components/foundation/choiceButton';
import * as actions from '../actions';
import * as Setup from '../components/setup';
import colors from '../colors';

let SCREEN_HEIGHT = Dimensions.get('window').height;
let SCREEN_WIDTH = Dimensions.get('window').width;
let listWidth = SCREEN_WIDTH * 0.8;
let headerHeight = SCREEN_HEIGHT * 0.1;
let choiceHeight = SCREEN_HEIGHT * 0.15;
let middleHeight = SCREEN_HEIGHT * 0.27;
let bottomHeight = SCREEN_HEIGHT * 0.125;
let listTop = SCREEN_HEIGHT * 0.09;
let listLeftOffset = SCREEN_WIDTH * 0.1;
let listItemHeight = SCREEN_HEIGHT * 0.135;
let checkBoxLength = listItemHeight * 0.2;

class SetupScreen extends Component {

    static navigationOptions = {
        title: 'Setup',
        tabBar: {
            icon: ({ tintColor }) => {
                return <Icon 
                    name='gear'
                    size={30}
                    type='octicon'
                    color={'white'}
                    iconStyle={{ marginTop: 10, marginBottom: 3 }}
                />;
            }
        }
    }

    constructor(props) {
        super(props);
        this.state = { workoutItems: [
            { title: 'Create a Workout', index: 0, icon: require('../images/workout.png') }, 
            { title: 'Edit a Workout', index: 1,  icon: require('../images/edit.png')}, 
            { title: 'Delete a Workout', index: 2, icon: require('../images/delete.png')}
        ], 
        exerciseItems: [
            { title: 'Create an Exercise', index: 0, icon: require('../images/workout.png') }, 
            { title: 'Edit an Exercise', index: 1, icon: require('../images/edit.png')}, 
            { title: 'Delete an Exercise', index: 2, icon: require('../images/delete.png')}
        ] };
    }


     onSelect = (index) => {
        const { setupOption } = this.props.setup_exercises;
        const listData = setupOption === 'left' ? this.state.workoutItems : this.state.exerciseItems;
        const selectedListItem = listData.filter(item => {
            return item.index === index;
        });
        const goToScreen = this.returnNavDestination(selectedListItem[0].title);
        this.props.navigation.navigate(goToScreen);
    }

    returnNavDestination = (item) => {
        switch (item) {
            case 'Create a Workout':
                return 'workoutCreate';
            case 'Edit a Workout':
                return 'workoutEdit';
            case 'Delete a Workout':
                return 'workoutDelete';
            case 'Create an Exercise':
                return 'exerciseCreate';
            case 'Edit an Exercise': 
                return 'exerciseEdit';
            case 'Delete an Exercise':
                return 'exerciseDelete';
            default:
                return 'setup';
        }
    }

    renderIcon = () => {
        return (
            <Icon 
                name='chevron-right'
                size={50}
            />
        );
    }

    renderListItems= () => {
        const { setupOption, selected } = this.props.setup_exercises;
        const listData = setupOption === 'left' ? this.state.workoutItems : this.state.exerciseItems;
        return listData.map((item) => {
            return (
                <ListItem
                    onSelect={this.onSelect} 
                    listText={item.title} 
                    selected={selected}
                    key={item.index}
                    index={item.index}
                    icon={item.icon}
                    rightIcon={this.renderIcon}
                />
            );
        });
    }

    onChoiceButtonPress = (choice) => {
        this.props.setupChoice(choice);
    }

    render() {
        return (
            <View style={styles.container}>
                <ListTitle title='SETUP' />
                <View style={styles.choiceContainer}>
                    <ChoiceButton 
                        choiceOne='WORKOUTS' 
                        choiceTwo='EXERCISES'
                        selected={this.props.setup_exercises.setupOption}
                        onPress={this.onChoiceButtonPress}
                    />
                </View>
                <View style={styles.listContainer}>
                    {this.renderListItems()}
                </View>
                <View style={styles.middle} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { setup_exercises, setup_workouts } = state;
    return {
        setup_exercises, setup_workouts
    };
};

export default connect(mapStateToProps, actions)(SetupScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    choiceContainer: {
        height: choiceHeight,
        backgroundColor: colors.background.light,
        alignItems: 'center',
        justifyContent: 'center'
    },
    middle: {
        backgroundColor: colors.background.light,
        flexDirection: 'row',
        height: SCREEN_HEIGHT * 0.4
    },
    listContainer: {
        borderTopColor: colors.border.light,
        borderTopWidth: 1
    },
    listContainerMiddle: {
        top: SCREEN_HEIGHT * 0.52,
        left: listLeftOffset,
        width: listWidth
    },
    modal: {
        flex: 1,
        padding: 0, 
        margin: 0
    },
    icon: {
        color: 'white'
    },
    iconTinted: {
        color: 'blue'
    }
});



