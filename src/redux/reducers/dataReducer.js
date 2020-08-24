import {
  SET_LISTS,
  CREATE_LIST,
  GET_LIST,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI
} from '../types';

const initialState = {
  lists: [],
  // list: {},
  // tasks: [],
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_LISTS:
      return {
        ...state,
        lists: action.payload
      }
    case CREATE_LIST:
      return {
        ...state,
        list: action.payload
      }
    case GET_LIST:
      return {
        ...state,
        list: action.payload.data.list
      }
    case LOADING_UI: 
      return {
        ...state,
        loading: true
      }
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}