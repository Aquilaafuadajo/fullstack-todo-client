import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI
} from '../types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

//let userID

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({type: LOADING_UI});
  axios
    .post('/users/signup', newUserData)
    .then(res => {
      //userID = res.data.data.user._id
      setAuthorizationHeader(res.data.token)
      dispatch({
        type: SET_USER,
        payload: res.data
      });
      dispatch({type: STOP_LOADING_UI});
      dispatch({ type: CLEAR_ERRORS });
      //history.push('/');
    }).catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response,
        //payload: err.response.data
      });
    })
}

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/users/login', userData)
    .then((res) => {
      const decodedUser = jwtDecode(res.data.token)
      //userID = decodedUser.id._id
      setAuthorizationHeader(res.data.token);
      dispatch({
        type: SET_USER,
        payload: {data: {user: decodedUser.id}}
      });
      dispatch({type: STOP_LOADING_UI});
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response
      });
    });
};

const setAuthorizationHeader = (token) => {
  const userToken = `Bearer ${token}`;
  localStorage.setItem('userToken', userToken);
  axios.defaults.headers.common['Authorization'] = userToken;
};