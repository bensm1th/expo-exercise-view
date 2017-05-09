import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Icon, Button, } from 'react-native-elements';
import Sets from '../Sets';
import colors from '../../../colors';

let SCREEN_HEIGHT = Dimensions.get('window').height;
let SCREEN_WIDTH = Dimensions.get('window').width;

const AddSetsListItem = props => {
    const renderSets = () => {
        return props.sets.map(set => {
            return (
                <View style={styles.renderSetsContainer} key={set._id}>
                    <Sets 
                        weight={set.weight}
                        reps={set.reps}
                        _id={set._id}
                        changeSetTextMethod={props.changeSetTextMethod}
                        deleteSetMethod={props.deleteSetMethod}
                        exerciseId={props.exerciseInfo._id}
                        {...props}
                    />
                </View>
            );
        });
    };
    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                {props.setsSaved &&
                <View style={styles.checkStyle}>
                    <Icon
                        size={30}
                        name='check'
                        type='font-awesome'
                    />
                </View>
                
                }
                <Text style={styles.name}>{props.exerciseInfo.name}</Text>
                <Button
                    title='ADD SET'
                    onPress={() => props.addSet(props.exerciseInfo._id)}
                    backgroundColor={colors.secondary.light}
                />
            </View>
            {props.setsVisibility && 
            <View style={styles.setListContainer}>
            
                <View style={styles.buttonContainer}>
                    {renderSets()}
                    <Button
                        title='SAVE'
                        onPress={() => props.saveSets(props.exerciseInfo._id)}
                        backgroundColor={colors.secondary.light}
                    />
                </View>
            </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    containerTop: {
        height: SCREEN_HEIGHT * 0.09,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container: {
        backgroundColor: colors.background.light,
        borderWidth: 1,
        borderColor: colors.border.light
    },
    name: {
        marginLeft: SCREEN_WIDTH * 0.04
    },
    buttonContainer: {
        marginBottom: SCREEN_HEIGHT * 0.01
    },
    setListContainer: {
        backgroundColor: colors.background.dark,
        borderWidth: 1,
        borderColor: colors.border.light
    },
    renderSetsContainer: {
        paddingTop: 10
    },
    checkStyle: {
        marginLeft: 15
    }
});

export default AddSetsListItem;
