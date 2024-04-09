import { merge } from "ramda";

// import levels from "../../config/levels";
import levels from "../../config/levels.json";
export const NEW_LEVEL = "level/new";
export const HIDDEN_CELL_HIDE = "hidden/hide";
export const HIDDEN_CELL_SHOW = "hidden/show";
export const FIELD_HIDE = "field/hide";
export const FIELD_SHOW = "field/show";
export const RESET_LEVEL = "level/reset";
const START_LEVEL = 1;

export const initialState = {
  level: START_LEVEL,
  showHidden: true,
  showField: false,
  levelConfig: {
    cellCount: 3,
    memoryCount: 3,
    space: 2,
    score: 1,
    time: 1000,
    fieldSize: window.innerWidth > 1280 ? window.innerHeight - 200 : window.innerWidth - 50 ,
  },
};

export function GameReducer(state, action) {
  switch (action.type) {
    case NEW_LEVEL:
      return merge(state, {
        level: action.level,
        levelConfig: {
          ...action.levelInfo,
          fieldSize: window.innerWidth > 1280 ? window.innerHeight - 200 : window.innerWidth - 50 ,
        },
      });
    case HIDDEN_CELL_SHOW:
      return merge(state, { showHidden: true });
    case HIDDEN_CELL_HIDE:
      return merge(state, { showHidden: false });
    case FIELD_HIDE:
      return merge(state, { showField: false });
    case FIELD_SHOW:
      return merge(state, { showField: true });
    case RESET_LEVEL:
      return merge(initialState, {
        levelConfig: {
          ...action.levelConfig,
          fieldSize: window.innerWidth > 1280 ? window.innerHeight - 200 : window.innerWidth - 50 ,
        },
      });
    default:
      return state;
  }
}
