import {
  GAME_START,
  GAME_END,
  WHEEL_OPEN,
  WHEEL_CLOSE,
  UPDATE_REWARD,
  RESET_REWARD,
} from '../action-types/index';

const initialState = {
  gameReward: 0,
  isGameEnd: true,
  isWheelOpen: false,
};

export default function auth (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GAME_END:
      return {
        ...state,
        isGameEnd: true,
      };
    case GAME_START:
      return {
        ...state,
        isGameEnd: false,
      };
    case WHEEL_OPEN:
      return {
        ...state,
        isWheelOpen: true,
      }
    case WHEEL_CLOSE:
      return {
        ...state,
        isWheelOpen: false,
      }
    case UPDATE_REWARD:
      return {
        ...state,
        gameReward: payload,
      }
    case RESET_REWARD:
      return {
        ...state,
        gameReward: 0,
      }
    default:
      return state;
  }
}
