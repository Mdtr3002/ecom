import {
  LOGIN_FAIL,
  LOGOUT
} from '../action-types/index';
import AuthService from '../services/auth.service';

export const login = () => async (dispatch) => {
  try {
    AuthService.login();
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => async (dispatch) => {
  sessionStorage.clear();
  localStorage.clear();
  dispatch({ type: LOGOUT });
};
