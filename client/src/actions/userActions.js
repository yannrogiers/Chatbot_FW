import Axios from "axios";
import Cookie from 'js-cookie';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL } from "../constants/userConstants";

//User inloggen
const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post('/api/users/signin', { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        //data van user wordt gesaved in cookie
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
}

//User registreren
const register = (first_name, last_name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { first_name, last_name, email, password } });
    try {
        const { data } = await Axios.post('/api/users/register', { first_name, last_name, email, password });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        //data van user wordt gesaved in cookie
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
}


//profiel updaten
const update = ({ userId, first_name, last_name, email, password }) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState()
    dispatch({ type: USER_UPDATE_REQUEST, payload: { userId, first_name, last_name, email, password } });
    try {
        const { data } = await Axios.put('/api/users/' + userId, { first_name, last_name, email, password },
            {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token
                }
            });
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        //data van user wordt gesaved in cookie
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
}


//User uitloggen van de applicatie doormiddel van de userInfo cookie te verwijderen
const logout = () => (dispatch) => {
    Cookie.remove("userInfo")
    dispatch({ type: USER_LOGOUT })
}

export { signin, register, logout, update };