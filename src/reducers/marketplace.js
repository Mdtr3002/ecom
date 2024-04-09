import {
    UPDATE_COLLECTION, UPDATE_INVENTORY
  } from '../action-types/index';
  
  const initialState = {
    collection: {},
    inventory: [],
  };
  
  export default function marketplace(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case UPDATE_COLLECTION:
        return {
          ...state,
          collection: payload,
        };
      case UPDATE_INVENTORY:
          return {
            ...state,
            inventory: payload,
          }
      default:
        return state;
    }
  }
