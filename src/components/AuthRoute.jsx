import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, authenticated, currentUser, ...rest }) => {
  let username = authenticated === true? currentUser.data.user.name : ''
  return <Route {...rest} render={(props) =>
              authenticated === true ? <Redirect to={`/${username}`} /> : <Component {...props} />
            }
          />
  
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  currentUser: state.user
});

export default connect(mapStateToProps)(AuthRoute)
