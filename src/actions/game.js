import {
  GAME_END, UPDATE_REWARD, WHEEL_OPEN
} from '../action-types';

export const endGame = () => async (dispatch) => {
  dispatch({ type: GAME_END });
};

export const updateReward = (amount) => async (dispatch) => {
  dispatch({
    type: UPDATE_REWARD,
    payload: amount,
  })
}

export const wheelOpen = () => async (dispatch) => {
  dispatch({ type: WHEEL_OPEN });
}
