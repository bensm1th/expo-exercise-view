import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import colors from '../colors';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    renderLastSlide = (index) => {
        if (index === this.props.data.length -1) {
            return (
                <Button 
                    title="Onwards"
                    raised
                    buttonStyle={styles.buttonStyle}
                    onPress={this.props.onComplete}
                />
                );
        }
    }

    renderSlides = () => {
        return this.props.data.map((slide, i) => {
            return (
                <View 
                    key={slide.text} 
                    style={[styles.slideStyle, { backgroundColor: slide.color }]}
                >
                    <Text style={styles.textStyle}>{slide.text}</Text>   
                    {this.renderLastSlide(i)} 
                </View>
            );
        });
    }

    render() {
        return (
            <ScrollView
                horizontal
                style={{ flex: 1 }}
                pagingEnabled
            >
                {this.renderSlides()}
            </ScrollView>
        ); 
    }
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 30,
        color: 'white'
    },
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    buttonStyle: {
        backgroundColor: colors.secondary.dark,
        marginTop: 15
    }
});

export default Slides;