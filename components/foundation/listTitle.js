import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../../colors';

let ScreenHeight = Dimensions.get("window").height;
let headerHeight = ScreenHeight * 0.1;

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
        color: colors.text.dark,
        fontSize: 30,
        marginTop: 25,
        fontWeight: 'bold'
    },
     header: {
        backgroundColor: colors.primary.medium,
        height: headerHeight,
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor: colors.border.light,
        borderBottomWidth: 1
    }
});
