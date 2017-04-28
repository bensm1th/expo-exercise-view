import React from 'react';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, Button } from 'react-native-elements';

let SCREEN_WIDTH = Dimensions.get("window").width;
let SCREEN_HEIGHT = Dimensions.get("window").height;

export default StartStepTwo = props => {
    return (
        <View>
            <Text>{props.name}</Text>
            <Text>{props.description}</Text>
            <Text>STATUS</Text>
            <View style={styles.stepTwoContainer}>
                <ScrollView >
                    {props.renderExercises()}
                </ScrollView>
            </View>
            <Button 
                title={"BACK"}
                onPress={props.onBack}
                backgroundColor='#8f9bff'
            />
        </View>  
    );
}

const styles = StyleSheet.create({
    stepTwoContainer: {
        borderWidth: 1,
        borderColor: 'silver',
        marginLeft: SCREEN_WIDTH * .036,
        width: SCREEN_WIDTH * .928,
    }
})

