import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, Image } from 'react-native';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
let listWidth = ScreenWidth * .8;
let listTop = ScreenHeight * .09;
let listLeftOffset = ScreenWidth * .1;
let listItemHeight = ScreenHeight * .12;
let checkBoxLength = listItemHeight * .2;

const ListItem = (props) => {
    const { selected, index, icon, rightIcon } = props;

    return (
        <TouchableOpacity
            onPress={() => props.onSelect(index)}
        >
            <View style={styles.listItem}>
                <Image
                    source={icon}
                    style={styles.icon}
                />
                <Text style={styles.listItemText}>{props.listText}</Text>
                <View style={styles.rightIconContainer}>
                    {rightIcon()}
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default ListItem;

const styles = StyleSheet.create({
     listItem: {
        backgroundColor: "#ffffff",
        height: listItemHeight,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: "#e0e0e0",
        borderBottomWidth: 2,
    },
    icon: {
        height: ScreenWidth * .1,
        width: ScreenWidth * .1,
        marginLeft: 15,
        marginRight: 20
    },
    rightIcon: {
        height: ScreenWidth * .07,
        width: ScreenWidth * .07,
        marginLeft: 15,
        marginRight: 20
    },
    rightIconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    listItemText: {
        color: "black",
        fontSize: 20,
    },
});