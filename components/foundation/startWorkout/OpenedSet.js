import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

let SCREEN_HEIGHT = Dimensions.get('window').height;

const OpenedSet = props => {
    return (
        <View>
        {props.sets.map(set => {
            const { openedSet, finishedSets } = props;
            const open = openedSet._id === set._id;
            const setFinished = finishedSets.some(id => id === set._id);
            let iconName;
            if (open) {
                iconName = 'minus-circle';
            }
            if (!open) {
                iconName = 'plus-circle';
            }
            if (setFinished) {
                iconName = 'check';
            }
            return (
            <View style={styles.setContainer} key={set._id}>
                <View key={set._id} style={styles.setContainerTop}>
                    <TouchableOpacity onPress={() => props.setsEditOpen(set)}>
                        <Icon 
                            name={iconName}
                            type="font-awesome"
                            size={40}
                        />
                    </TouchableOpacity>
                    <Text>Goals: </Text>
                    <Text>weight - {set.goals.weight}</Text>
                    <Text>reps - {set.goals.number}</Text>
                </View>
                {open &&
                <View>
                    {props.renderActualReps()}
                </View>    
                }
            </View>
            );
        })}
        </View>
    );
};

const styles = StyleSheet.create({
 setContainerTop: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#a9a9a9',
        height: SCREEN_HEIGHT * 0.1,
        borderBottomWidth: 1,
        borderBottomColor: 'silver'
    },
    setContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
});

export default OpenedSet;
