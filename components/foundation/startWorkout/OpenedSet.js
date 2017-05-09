import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../../colors';

let SCREEN_HEIGHT = Dimensions.get('window').height;

const OpenedSet = props => {
    return (
        <View>
        {props.sets.map(set => {
            const { openedSet, finishedSets } = props;
            const open = openedSet._id === set._id;
            const setFinished = finishedSets.some(id => id === set._id);
            let iconName;
            let size;
            if (open) {
                iconName = 'expand-less';   
                size=45;
            }
            if (!open) {
                iconName = 'expand-more';
                size=45;
            }
            if (setFinished) {
                iconName = 'check';
                size=30;
            }
            return (
            <View style={styles.setContainer} key={set._id}>
                <View key={set._id} style={styles.setContainerTop}>
                    <TouchableOpacity 
                        onPress={() => props.setsEditOpen(set)}
                    >
                        <Icon 
                            name={iconName}
                            size={size}
                            color={colors.secondary.dark}
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
        backgroundColor: colors.background.dark,
        height: SCREEN_HEIGHT * 0.06,
        borderBottomWidth: 1,
        borderBottomColor: colors.border.light
    },
    setContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
});

export { OpenedSet };
