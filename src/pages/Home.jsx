import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import snack from '../images/snack.png';

export default class Home extends Component {
  render() {
    return (
      <div className='home'>
        <h1 className='welcome-text'>Welcome FullSnack Todo</h1>
        <div className="img-container">
          <img style={{width: '100%'}} src={snack} alt="snack"/>
        </div>
        <div className="links">
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Sign up</Link>
        </div>
      </div>
    )
  }
}

