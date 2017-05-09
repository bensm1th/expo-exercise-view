import * as types from '../actions/types';

const initialState = {
    fb_token: '',
    user: {
        firstName: '',
        lastName: '',
        id: '',
    }
};

export default auth_reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case types.USER_LOAD:
            const { firstName, lastName, id } = action.payload;
            return {
                ...state,
                user: { firstName, lastName, id }
            };
        case types.FACEBOOK_LOGIN_FAIL:
            return {
                ...state,
                fb_token: null
            };
        case types.FACEBOOK_LOGIN_SUCCESS:
            return {
                ...state,
                fb_token: action.payload
            };
        default:
            return state;
    }
};