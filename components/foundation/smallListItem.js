import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, Image } from 'react-native';
import { Icon } from 'react-native-elements';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
let listItemHeight = ScreenHeight * .12;

const SmallListItem = (props) => {
    const { moreIcon, onSelect, id, lessIcon, moreInfoId, onMoreInfo } = props;
    return (
            <View style={styles.listItem}>
                <View style={styles.mainItem}>
                    <TouchableOpacity
                        onPress={() => props.onMoreInfo(id)}
                        style={styles.icon}
                    >
                    {moreInfoId === id ? (
                        <Icon 
                            name="ios-more-outline"
                            size={40}
                            type="ionicon"
                        />
                    ) : (
                        <Icon 
                            name="ios-more"
                            size={40}
                            type="ionicon"
                        />
                    )}
                        
                    </TouchableOpacity>
                    <View 
                        style={styles.itemTextContainer}
                    >
                        <Text style={styles.itemText}>{props.name}</Text>
                        <TouchableOpacity
                            onPress={() => props.onSelect(id)}
                            style={styles.rightIcon}
                        >
                            <View>
                                {props.rightIcon(id)}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                {moreInfoId === id &&
                    <View style={styles.moreInfo}>
                        <View style={styles.infoItem}>
                            <Text style={styles.moreInfoText}>Description: </Text>
                            <Text >{props.description}</Text> 
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.moreInfoText}>Type: </Text>
                            <Text>{props.type}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.moreInfoText}>Points per Set: </Text> 
                            <Text>{props.points}</Text>
                        </View>
                    </View>  
                }
            </View>
    );
}

export default SmallListItem;

const styles = StyleSheet.create({
     listItem: {
        flexDirection: 'column',
        borderBottomColor: "#e0e0e0",
        borderBottomWidth: 2,
    },
    mainItem: {
        height: listItemHeight,
        flexDirection: 'row',
        alignItems: 'center',
    },
    moreInfo: {
        flex: 1
    },
    itemTextContainer: {
        flex: 1,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoItem: {
        marginLeft: 78,
        marginRight: 15,
        flexWrap: 'wrap',
        marginBottom: 10
    },
    moreInfoText: {
        fontWeight: 'bold'
    },
    icon: {
        height: ScreenWidth * .06,
        width: ScreenWidth * .06,
        marginLeft: 15,
        marginRight: 20
    },
    itemText: {
        color: "black",
        fontSize: 20,
    },
    rightIcon: {
        marginRight: ScreenWidth * .06
    }
});