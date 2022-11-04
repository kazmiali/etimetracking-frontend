import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { ReactComponent as GoogleLogo } from '../../assets/icons/icon-google.svg';

import AuthNavbar from '../../components/auth-navbar/auth-navbar.component';

import {
  googleSignInStart,
  emailSignInStart,
} from '../../redux/user/user.actions';

import {
  isEmailValid,
  isPasswordLengthValid,
} from '../../utils/validateFields';

const Login = ({
  isAuthenticated,
  emailSignInStart,
  googleSignInStart,
  match: { path },
}) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const clearState = () => {
    setCredentials({
      email: '',
      password: '',
    });
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  const { email, password } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      isEmailValid(email, clearState) &&
      isPasswordLengthValid(password, clearState)
    ) {
      emailSignInStart(email, password);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <Fragment>
      <AuthNavbar path={path} />
      <div className='auth-page'>
        <div className='auth-box'>
          <div>
            <div className='auth-heading '>Login</div>
          </div>
          <form className='auth-form' onSubmit={handleSubmit}>
            <input
              name='email'
              type='email'
              value={email}
              className='auth-input mt-1'
              placeholder='Enter Email'
              onChange={handleChange}
            />
            <input
              name='password'
              type='password'
              value={password}
              className='auth-input mt-1'
              placeholder='Enter Password'
              onChange={handleChange}
            />
            <input
              type='submit'
              className='btn btn-auth mt-1'
              value='LOGIN'
            />

            <p className='auth-or mt-1'>
              <span className='auth-or-span'>OR</span>
            </p>
          </form>
          <button
            className='btn btn-google mt-1'
            onClick={googleSignInStart}
          >
            <GoogleLogo className='google-logo' />
            <span className='btn-google-text'>
              Continue with Google
            </span>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
