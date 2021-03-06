import React, { Component } from 'react';
import { View, UIManager, Text, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../colors';

let SCREEN_HEIGHT = Dimensions.get("window").height;
let SCREEN_WIDTH = Dimensions.get("window").width;
let listItemHeight = SCREEN_HEIGHT * 0.12;

class SmallListItem extends Component {
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.moreInfoId !== this.props.id && this.props.id === this.props.moreInfoId) {
            Animated.timing(this.animatedValue, {
                toValue: 0,
                duration: 200
            }).start();
        } 
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.easeInEaseOut();
    }

    rotate = (id) => {
        if (this.props.moreInfoId !== this.props.id) {
            this.props.onMoreInfo(id);
            Animated.timing(this.animatedValue, {
                toValue: 1,
                duration: 300
            }).start();
        } else {
            this.props.onMoreInfo(id);
            Animated.timing(this.animatedValue, {
                toValue: 0,
                duration: 300
            }).start();
        }
    }

    renderInfo = () => {
        const fadeInterpolation = this.animatedValue.interpolate({
            inputRange: [0, 0.9, 1],
            outputRange: ['rgb(247,247,247)', 'rgb(247,247,247)', 'rgb(0,0,0)']
        });
        const fadeStyle = {
            color: fadeInterpolation
        }
        return this.props.infoText.map(info => {
            if (info.label !== 'User') {
                return (
                    <View style={styles.infoItem} key={info.label}>
                        <Animated.Text style={[styles.moreInfoText, fadeStyle]}>{info.label}: </Animated.Text>
                        <Animated.Text style={fadeStyle}>{info.text}</Animated.Text> 
                    </View>
                );
            }
        });
    }
    render() { 
        const { onSelect, id, moreInfoId, onMoreInfo, parent, workout, userId } = this.props;
        const rotateMoreInterpolation = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg']
        });
        const moreIconStyle = {
            transform: [{ rotateX: rotateMoreInterpolation }]
        }; 
        const onSelectProp = parent === 'start' ? workout : id;
        return (
                <View style={styles.listItem}>
                    <View style={styles.mainItem}>
                        <TouchableWithoutFeedback
                            onPress={() => this.rotate(id)}
                        >
                            <Animated.View style={[styles.icon, moreIconStyle]}>
                                <Icon 
                                    name="expand-more"
                                    size={40}
                                />
                            </Animated.View>
                        </TouchableWithoutFeedback>
                        <View 
                            style={styles.itemTextContainer}
                        >
                            <Text style={styles.itemText}>{this.props.name}</Text>
                            <View style={styles.rightIcon}>
                                <TouchableWithoutFeedback
                                    onPress={() => this.props.onSelect(onSelectProp, userId)}

                                >
                                    <View style={styles.moreInfo}>
                                        {this.props.rightIcon(id)}
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                    {moreInfoId === id &&
                    <View>
                        {this.renderInfo()}
                    </View>
                    }
                </View>
        );
    }
}

export default SmallListItem;

const styles = StyleSheet.create({
     listItem: {
        flexDirection: 'column',
        borderBottomColor: colors.border.light,
        borderBottomWidth: 2,
        backgroundColor: colors.background.light,
        overflow: 'hidden'
    },
    mainItem: {
        height: listItemHeight,
        flexDirection: 'row',
        alignItems: 'center',
    },
    moreInfo: {
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
        marginLeft: 15,
        marginRight: 20
    },
    itemText: {
        color: colors.text.dark,
        fontSize: 20,
    },
    rightIcon: {
        marginRight: SCREEN_WIDTH * 0.06
    }
});
