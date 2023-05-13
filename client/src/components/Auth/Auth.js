
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import AdminLogin from './adminLogin.js';
import UserLogin from './userLogin.js';
import useStyles from './styles';

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
              padding: '0.7rem 5rem',
              backgroundColor: '#3F51B5',
              color: 'white',
              borderRadius: '40px',
              border: "2px solid #ffffff",
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
            onClick={switchMode}
          >
            {loginSide ? 'USER PORTAL' : 'SELLER PORTAL'}
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

export default authPage;

