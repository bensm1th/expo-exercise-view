import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import colors from '../../colors';

let SCREEN_HEIGHT = Dimensions.get('window').height;
let SCREEN_WIDTH = Dimensions.get('window').width;
let listItemHeight = SCREEN_HEIGHT * 0.12;

const ListItem = (props) => {
    const { index, icon, rightIcon } = props;

    return (
        <TouchableOpacity
            onPress={() => props.onSelect(index)}
        >
            <View style={styles.listItem}>
                <Image
                    source={icon}
                    style={styles.icon}
                    tintColor={colors.primary.medium}
                />
                <Text style={styles.listItemText}>{props.listText}</Text>
                <View style={styles.rightIconContainer}>
                    {rightIcon()}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ListItem;

const styles = StyleSheet.create({
     listItem: {
        backgroundColor: colors.background.white,
        height: listItemHeight,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: colors.border.light,
        borderBottomWidth: 2,
    },
    icon: {
        height: SCREEN_WIDTH * 0.1,
        width: SCREEN_WIDTH * 0.1,
        marginLeft: 15,
        marginRight: 20
    },
    rightIcon: {
        height: SCREEN_WIDTH * 0.07,
        width: SCREEN_WIDTH * 0.07,
        marginLeft: 15,
        marginRight: 35
    },
    rightIconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 20
    },
    listItemText: {
        color: colors.text.dark,
        fontSize: 20,
    },
});
