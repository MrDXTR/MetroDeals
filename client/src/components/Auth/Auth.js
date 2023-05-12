
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from './icon2.js';

import AdminLogin from './adminLogin.js';
import UserLogin from './userLogin.js';

import Icon from './icon.js';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';
import CustomAvatar from './CustomAvatar';

import { GoogleOAuthProvider } from '@react-oauth/google';

const authPage = () => {
  const [loginSide, setLoginSide] = useState(false);
  const switchMode = () => {
    setLoginSide((prevLoginSide) => !prevLoginSide);
  };
  const classes = useStyles();

  return (
    <div>
      {loginSide ? <AdminLogin /> : <UserLogin />}
      <Grid container justify="center">
        <Grid item>
          <button
            className={classes.submit}
            style={{
              width: '100%',
              padding: '10px 26px',
              backgroundColor: '#3F51B5',
              color: 'white',
              borderRadius: '40px',
              border: "2px solid #ffffff",
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onClick={switchMode}
          >
            {loginSide ? 'LOGIN AS USER' : 'LOGIN AS ADMIN'}
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

export default authPage;

