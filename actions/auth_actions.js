import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import * as types from './types';

const URL = '192.168.1.109';
const ROOT_URL = `http://${URL}:3000`;

const saveUser = async (token, dispatch) => {
    console.log('----------- saving user ----------');
    const options = `access_token=${token}&&fields=id,first_name,last_name,gender,age_range`;
    let { data } = await axios.get(`https://graph.facebook.com/me?${options}`);
   
    const userProps = {
        firstName: data.first_name,
        lastName: data.last_name,
        workouts: [],
        id: data.id
    };
    let response = await axios.post(`${ROOT_URL}/user`, userProps);

    dispatch({
        type: types.USER_LOAD,
        payload: response.data
    });
};

export const loadUser = token => async dispatch => {
    const options = `access_token=${token}&&fields=id,first_name,last_name,gender,age_range`;
    let { data } = await axios.get(`https://graph.facebook.com/me?${options}`);
    let response = await axios.get(`${ROOT_URL}/user/${data.id}`);
    dispatch({
        type: types.USER_LOAD,
        payload: response.data
    });
};

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
        //dispatch an action saying fb login is done
        dispatch({ type: types.FACEBOOK_LOGIN_SUCCESS, payload: token });
    } else {
        // start fb login process
        doFacebookLogin(dispatch);
    }
};

const doFacebookLogin = async dispatch => {

    let { type, token } = await Facebook.logInWithReadPermissionsAsync('288866728233773', {
        permissions: ['public_profile']
    });

    if (type === 'cancel') {
        return dispatch({ type: types.FACEBOOK_LOGIN_FAIL });
    }

    await AsyncStorage.setItem('fb_token', token);
    saveUser(token, dispatch);
    dispatch({ type: types.FACEBOOK_LOGIN_SUCCESS, payload: token });
};
