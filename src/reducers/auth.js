import {
  CREATE_CLUBDAY_INFO,
  LOGIN,
  LOGIN_FAIL,
  LOGOUT,
  RESET_USER_INFO,
  SET_USER_INFO,
} from "../action-types/index";

const initialState = {
  isAuthenticate: false,
  user: null,
  isClubdayVerify: true,
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticate: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticate: false,
      };
    case LOGOUT:
      return initialState;
    case SET_USER_INFO:
      return {
        ...state,
        user: payload,
      };
    case RESET_USER_INFO:
      return {
        ...state,
        user: null,
      };
    case CREATE_CLUBDAY_INFO:
      return {
        ...state,
        isClubdayVerify: false,
      };
    default:
      return state;
  }
}
