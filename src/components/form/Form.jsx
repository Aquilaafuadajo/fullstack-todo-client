import React from 'react';
import './Form.css';
import {Link} from 'react-router-dom';

function Form({...props}) {
  const {onSubmit, onChange, signUp, name, email, password, confirmPassword} = props
  return (
    <div className='form-container'>
      <form noValidate onSubmit={onSubmit}>
      {
        signUp? 
        <>
          <div className="input-group">
            <div className="inset">
              <input onChange={onChange} autoComplete="off" type="text" name='name' value={name} required />
              <label className="input-label" htmlFor='name' value={name}>
                <span className="input-label-content">Name</span>
              </label>
            </div>
          </div>
          <div className="input-group">
            <div className="inset">
              <input onChange={onChange} autoComplete="off" type="email" name='email' value={email} required />
              <label className="input-label" htmlFor='email' value={email}>
                <span className="input-label-content">Email</span>
              </label>
            </div>
          </div>
          <div className="input-group">
            <div className="inset">
              <input onChange={onChange} autoComplete="off" type="password" name='password' value={password} required />
              <label className="input-label" htmlFor='password' value={password}>
                <span className="input-label-content">Password</span>
              </label>
            </div>
          </div>
          <div className="input-group">
            <div className="inset">
              <input onChange={onChange} autoComplete="off" type="password" name='confirmPassword' value={confirmPassword} required />
              <label className="input-label" htmlFor='password' value={confirmPassword}>
                <span className="input-label-content">Confirm Password</span>
              </label>
            </div>
          </div>
        </>
      : 
        <>
          <div class="input-group">
            <div class="inset">
              <input onChange={onChange} autoComplete="off" type="email" name='email' value={email} required />
              <label class="input-label" htmlFor='email' value={email}>
                <span class="input-label-content">Email</span>
              </label>
            </div>
          </div>
          <div class="input-group">
            <div class="inset">
              <input onChange={onChange} autoComplete="off" type="password" name='password' value={password} required />
              <label class="input-label" htmlFor='password' value={password}>
                <span class="input-label-content">Password</span>
              </label>
            </div>
          </div>
        </>
      }
      <button className='input-group btn' type='submit'>
        {signUp? 'sign up' : 'login'}
      </button>
      <small className='login-link'>
        already have an account? login <Link to='/login'>here</Link>
      </small>
    </form>
    </div>
  )
}

export default Form

