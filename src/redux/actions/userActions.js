import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER
} from '../types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({type: LOADING_UI});
  axios
    .post('/users/signup', newUserData)
    .then(res => {
      console.log(res.data)
      setAuthorizationHeader(res.data.token)
      dispatch({
        type: SET_USER,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS });
      //history.push('/');
    }).catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    })
}

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get('/lists')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
  console.log(jwtDecode(token))
  const userToken = `Bearer ${token}`;
  localStorage.setItem('userToken', userToken);
  axios.defaults.headers.common['Authorization'] = userToken;
};