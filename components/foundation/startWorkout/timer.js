import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import timer from 'react-native-timer';
import moment from 'moment';
import * as actions from '../../../actions';

class _Timer extends Component {
    constructor(props) {
        super(props);
        this.state = { elapsedTime: '0:00' };
        this.startTimer();
    } 

     componentWillReceiveProps(nextProps) {
        const { paused: { isPaused }, workoutStarted } = this.props.start;
        if (isPaused && !nextProps.start.paused.isPaused && workoutStarted) {
            this.startTimer();
        }
        if (!isPaused && nextProps.start.paused.isPaused && workoutStarted) {
            this.props.sendPauseTime(this.state.elapsedTime);
            timer.clearInterval('startTimer');
        }
        if (!workoutStarted) {
            timer.clearInterval('startTimer');
        }
    }

    componentWillUnmount() {
        timer.clearInterval('startTimer');
    }

    startTimer = () => {
        timer.setInterval('startTimer', () => {
            const { startTime, paused: { elapsedDuration } } = this.props.start;
            const elapsedMinutes = elapsedDuration.match(/.+(?=:)/g)[0];
            const elapsedSeconds = elapsedDuration.match(/[^:]*$/g)[0];
            const currentTime = moment().add({ minutes: elapsedMinutes, seconds: elapsedSeconds });
            const duration = moment.duration(currentTime.diff(startTime));
            const seconds = moment(duration.seconds());
            const spacer = seconds < 10 ? '0' : '';
            const elapsedTime = `${duration.minutes()}:${spacer}${seconds}`;
            this.setState({ elapsedTime });
        }, 1000);
    }  

    render() {
        return (
            <Text>{this.state.elapsedTime}</Text>
        );
    }
}

const mapStateToProps = state => {
    const { start } = state;
    return { start };
};

export default connect(mapStateToProps, actions)(_Timer);
