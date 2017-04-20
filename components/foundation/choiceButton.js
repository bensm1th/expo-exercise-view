import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
let choiceHeight = ScreenHeight * .15;

const ChoiceButton = (props) => {
    const { selected } = props;
    const leftContainer = selected === 'left' ? styles.selectedChoiceTextContainerL : styles.choiceTextContainerL;
    const leftText = selected === 'left' ? styles.selectedChoiceText : styles.choiceText;
    const rightContainer = selected === 'right' ? styles.selectedChoiceTextContainerR : styles.choiceTextContainerR;
    const rightText = selected === 'right' ? styles.selectedChoiceText : styles.choiceText;

    return (
        <View style={styles.choiceButton}>
            <TouchableOpacity 
                style={leftContainer}
                onPress={() => props.onPress('left')}
            >
                    <Text style={leftText}>{props.choiceOne}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={rightContainer}
                onPress={() => props.onPress('right')}
            >
                    <Text style={rightText}>{props.choiceTwo}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default ChoiceButton;

const styles = StyleSheet.create({
    choiceTextContainerR: {
        backgroundColor: "#f7f7f7",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedChoiceTextContainerR: {
        backgroundColor: "#536dff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    choiceTextContainerL: {
        backgroundColor: "#f7f7f7",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedChoiceTextContainerL: {
        backgroundColor: "#536dff",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    choiceText: {
        fontSize: 20,
        color: "#536dff",
        fontWeight: 'bold'
    },
    selectedChoiceText: {
        fontSize: 20,
        color: "#ffffff",
        fontWeight: 'bold'
    },
    choiceButton: {
        borderColor: "#536dff",
        borderWidth: 1,
        flexDirection: 'row',
        width: ScreenWidth * .9,
        justifyContent: 'space-around',
        height: ScreenHeight * .06,
        borderRadius: 5,
        overflow: 'hidden'
    }
})