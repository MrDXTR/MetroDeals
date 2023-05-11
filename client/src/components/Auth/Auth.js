import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Button, Paper, Grid, Typography, Container } from '@material-ui/core';
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

  return(
    <div>

      <Grid container justify="center">
      <Grid item>
      <Button fullWidth variant="contained" color="primary" className={classes.submit} onClick={switchMode}>
              { loginSide ? "Login As User" : "Login As Admin" }
      </Button>
      </Grid>
      </Grid>
      {loginSide ? <AdminLogin/> : <UserLogin/>}

    </div>
  );
};

export default authPage;