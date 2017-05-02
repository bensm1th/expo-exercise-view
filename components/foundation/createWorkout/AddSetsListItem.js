import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, Image } from 'react-native';
import { Icon, Button, FormInput, FormLabel, LayoutAnimation } from 'react-native-elements';
import Sets from '../Sets';
import * as types from '../../../actions/types';
import colors from '../../../colors';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;

const AddSetsListItem = props => {
    const renderSets = () => {
        return props.sets.map(set => {
            return (
                <View style={styles.addSetContainer} key={set._id}>
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
                <Icon
                    size={30}
                    name='check'
                    type='font-awesome'
                />
                }
                <Text style={styles.name}>{props.exerciseInfo.name}</Text>
                <Button
                    title='ADD SET'
                    onPress={() => props.addSet(props.exerciseInfo._id)}
                    backgroundColor={colors.secondary.light}
                />
            </View>
            <View style={styles.setListContainer}>
            {props.setsVisibility && 
                <View>
                    {renderSets()}
                    <Button
                        title='SAVE'
                        onPress={() => props.saveSets(props.exerciseInfo._id)}
                        backgroundColor={colors.secondary.light}
                    />
                </View>
            }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerTop: {
        height: SCREEN_HEIGHT * 0.12,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        borderBottomColor: colors.border.light,
        borderBottomWidth: 2,
        backgroundColor: colors.background.light,
    },
    name: {
        marginLeft: SCREEN_WIDTH * 0.08
    },
    addSetContainer: {
        flex: 1,
    },
    setListContainer: {
        marginBottom: SCREEN_HEIGHT * 0.03
    }
})

export default AddSetsListItem;
