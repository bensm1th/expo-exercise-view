import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, Image } from 'react-native';
import { Icon, Button, FormInput, FormLabel } from 'react-native-elements';
import Sets from '../Sets';
import * as types from '../../../actions/types';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;

const AddSetsListItem = props => {
    const renderSets = () => {
        return props.sets.map(set => {
            return (
                <View style={styles.addSetContainer} key={set.id}>
                    <Sets 
                        weight={set.weight}
                        reps={set.reps}
                        id={set.id}
                        changeSetTextMethod={props.changeSetTextMethod}
                        exerciseId={props.exerciseInfo._id}
                    />
                </View>
            )
        });
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerTop}>
                <Text style={styles.name}>{props.exerciseInfo.name}</Text>
                <Button
                    title='ADD SET'
                    onPress={() => props.addSet(props.exerciseInfo._id)}
                    backgroundColor='#8f9bff'
                />
            </View>
            <View style={styles.setListContainer}>
                {renderSets()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerTop: {
        height: SCREEN_HEIGHT * .12,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        borderBottomColor: "#e0e0e0",
        borderBottomWidth: 2,
        backgroundColor: '#f7f7f7',
    },
    name: {
        marginLeft: SCREEN_WIDTH * .08
    },
    addSetContainer: {
        flex: 1,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 2,
        height: SCREEN_HEIGHT * .1,
        width: SCREEN_WIDTH * .8,
        marginLeft: SCREEN_WIDTH * .1,
        
    },
    setListContainer: {
        marginBottom: SCREEN_HEIGHT * .03
    }
})

export default AddSetsListItem;