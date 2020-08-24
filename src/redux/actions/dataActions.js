import {
  SET_LISTS,
  CREATE_LIST,
  GET_LIST,
  SET_TASK,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI
} from '../types';
import axios from 'axios';

export const getAllLists = () => (dispatch) => {
  dispatch({type: LOADING_UI})
  axios
    .get('/lists/')
    .then(res => {
      dispatch({
        type: SET_LISTS,
        payload: res.data.data.list
      })
      dispatch({type: STOP_LOADING_UI});
      dispatch({type: CLEAR_ERRORS})
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response
      })
    })
}

export const createList = (listData) => (dispatch) => {
  console.log(listData)
  dispatch({type: LOADING_UI})
  axios
    .post('/lists/', listData)
    .then(res => {
      dispatch({
        type: CREATE_LIST,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response
      })
    })
}

export const deleteList = listID => (dispatch) => {
  dispatch({type: LOADING_UI})
  axios
    .delete(`/lists/${listID}`)
    .then(res => {
      console.log(res.data)
      dispatch({type: STOP_LOADING_UI})
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response
      })
    })
}

export const getList = id => (dispatch) => {
  console.log(id)
  dispatch({type: LOADING_UI})
  axios
    .get(`/lists/${id}`)
    .then(res => {
      console.log(res.data)
      dispatch({
        type: GET_LIST,
        payload: res.data
      })
      dispatch({type: STOP_LOADING_UI})
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response
      })
    })
}

export const addTask = (task, listID) => (dispatch) => {
  dispatch({type: LOADING_UI})
  axios
    .post(`/lists/${listID}`, task)
    .then(res => {
      console.log(res.data)
      dispatch({type: STOP_LOADING_UI})
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response
      })
    })
}

export const deleteTask = (taskID, listID) => (dispatch) => {
  dispatch({type: LOADING_UI})
  axios
    .delete(`/lists/${listID}/${taskID}`)
    .then(res => {
      console.log(res.data)
      dispatch({type: STOP_LOADING_UI})
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response
      })
    })
}

export const updateTask = (taskID, listID, currentStatus) => (dispatch) => {
  dispatch({type: LOADING_UI})
  axios
    .patch(`/lists/${listID}/${taskID}`, currentStatus)
    .then(res => {
      console.log(res.data)
      dispatch({type: STOP_LOADING_UI})
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response
      })
    })
}