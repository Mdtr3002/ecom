import {
    UPDATE_PODIUM
  } from '../action-types/index';
  
  const initialState = {
    oldData: [],
    podium: [],
  };
  
  export default function leaderboard (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case UPDATE_PODIUM:
        return {
          ...state,
          oldData: state.podium,
          podium: payload,
        };
      default:
        return state;
    }
  }