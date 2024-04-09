import { CHANGE_AUDIO } from "../action-types";

const initialState = {
  backgroundAudio: ""
};

export default function audio (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_AUDIO:
      return {
        ...state,
        backgroundAudio: payload,
      };
    default:
      return state;
  }
}
