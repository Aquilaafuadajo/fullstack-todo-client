import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import './App.css';

import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
import UserPage from './pages/UserPage';

import AuthRoute from './components/AuthRoute';

import {Provider} from 'react-redux';
import store from './redux/store';

axios.defaults.baseURL = 'https://aquils-todo.herokuapp.com/api/v1'   

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/signup" component={SignUp} />
            <Route exact path='/:username' component={UserPage} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

// Todo: continue with the sign in route so it redirects a login user to the /:username route
//       fix login endpoint from BE to return user data included in the token