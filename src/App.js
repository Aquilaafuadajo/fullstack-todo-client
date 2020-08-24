import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import './App.css';

import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import UserPage from './pages/UserPage';
import TaskPage from './pages/TaskPage';

import AuthRoute from './components/AuthRoute';

import {Provider} from 'react-redux';
import store from './redux/store';
import {persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react'

axios.defaults.baseURL =   'http://localhost:3001/api/v1' //'https://aquils-todo.herokuapp.com/api/v1' 
const token = localStorage.userToken  
if(token) {
  axios.defaults.headers.common['Authorization'] = token; 
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <PersistGate persistor={persistor}>
            <Switch>
              <Route exact path='/' component={Home} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/signup" component={SignUp} />
              <Route exact path='/:username' component={UserPage} />
              <Route exact path='/:username/:taskID' component={TaskPage} />
            </Switch>
          </PersistGate>
        </div>
      </Router> 
    </Provider>
  );
}

export default App;

// Todo: continue with the sign in route so it redirects a login user to the /:username route
//       fix login endpoint from BE to return user data included in the token