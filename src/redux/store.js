import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {persistStore} from 'redux-persist';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['data']
}

const checkLoggedIn = () => {
  if (localStorage.userToken) return persistConfig['whitelist'] = ['data', 'user']
}
checkLoggedIn()

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer
});

const rootReducer = persistReducer(persistConfig, reducers)

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

export const persistor = persistStore(store)

export default store;
