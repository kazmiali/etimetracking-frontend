import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  googleSignInStart,
  signUpStart,
} from '../../redux/user/user.actions';

import AuthNavbar from '../../components/auth-navbar/auth-navbar.component';
import { ReactComponent as GoogleLogo } from '../../assets/icons/icon-google.svg';

import {
  isDisplayNameValid,
  isEmailValid,
  isPasswordValid,
  isPasswordLengthValid,
} from '../../utils/validateFields';

const SignUp = ({
  isAuthenticated,
  googleSignInStart,
  signUpStart,
  path,
}) => {
  const [userCredentials, setCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const clearState = () => {
    setCredentials({
      ...userCredentials,
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  const {
    displayName,
    email,
    password,
    confirmPassword,
  } = userCredentials;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      isDisplayNameValid(displayName, clearState) &&
      isEmailValid(email, clearState) &&
      isPasswordValid(password, confirmPassword, clearState) &&
      isPasswordLengthValid(password, clearState)
    ) {
      signUpStart(email, password, displayName);

      setCredentials({
        ...userCredentials,
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  };

  const handleChange = (event) => {
    setCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Fragment>
      <AuthNavbar path={path} />
      <div className='auth-page'>
        <div className='auth-box'>
          <div>
            <div className='auth-heading '>Sign Up</div>
          </div>
          <form className='auth-form' onSubmit={handleSubmit}>
            <input
              type='text'
              name='displayName'
              value={displayName}
              className='auth-input mt-1'
              onChange={handleChange}
              placeholder='Display Name'
            />
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
              name='confirmPassword'
              type='password'
              value={confirmPassword}
              className='auth-input mt-1'
              placeholder='Confirm Password'
              onChange={handleChange}
            />
            <input
              type='submit'
              className='btn btn-auth mt-1'
              value='SIGN UP'
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
  signUpStart: (email, password, displayName) =>
    dispatch(signUpStart({ email, password, displayName })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
