import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import LockOutlinedIcon from './icon2.js';
import jwtDecode from 'jwt-decode';

import Icon from './icon.js';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';
import CustomAvatar from './CustomAvatar';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', isAdmin: false, loginType: "local" };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const decoded = jwtDecode(res.credential);
    
    const result = {
      email: decoded.email,
      familyname: decoded.family_name, // last name
      name: decoded.name,
      givenName: decoded.given_name, // first name
      googleID: decoded.sub,
      imageUrl: decoded.picture,
      isAdmin: false,
      loginType: "google",
      cred: res.credential
    }

    const token = res.credential;

    try {
        if (isSignup) {
          dispatch(signup(result, history));
        } else {
          dispatch(signin(result, history));
        }
    //   dispatch({ type: AUTH, data: { result, token } });


      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later');


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <CustomAvatar className={classes.CustomAvatar}>
          <LockOutlinedIcon />
        </CustomAvatar>
        <Typography className='m-3' component="h1" variant="h5">{isSignup ? "User Sign Up": "User Login"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
          )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            render={(renderProps) => (
                <div className={classes.googleButton}>
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
              </div>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;
