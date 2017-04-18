import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

let ScreenHeight = Dimensions.get("window").height;
let headerHeight = ScreenHeight * .1;

const ListTitle = (props) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>
                {props.title}
            </Text>
        </View>
    );
}

export default ListTitle;

const styles = StyleSheet.create({
     headerText: {
        color: '#000000',
        fontSize: 30,
        marginTop: 25,
        fontWeight: 'bold'
    },
     header: {
        backgroundColor: '#f44330',
        height: headerHeight ,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor: "#e0e0e0",
        borderBottomWidth: 1
    }
});