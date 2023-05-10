// CustomAvatar.js

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    fontSize: theme.spacing(3),
    backgroundColor: 'grey',
    color: theme.palette.primary.main,
    borderRadius: '50%',
    border: `2px solid ${theme.palette.primary.main}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const CustomAvatar = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.avatar}>{children}</div>;
};

export default CustomAvatar;
