import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import swal from 'sweetalert';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });
    router.push('/');
  } catch (error) {
    console.log(error?.response?.data?.message)
    swal({
      title: "Error",
      text: error?.response?.data?.message,
      icon: "error",
    });
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
    swal({
      title: "Error",
      text: error?.response?.data?.message,
      icon: "error",
    });
  }
};
