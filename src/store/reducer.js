import {
  SET_CHANNEL,
  SET_USER,
  SET_FAV_CHANNEL,
  REMOVE_FAV_CHANNEL,
} from "./action";
import { combineReducers } from "redux";
let initialUserState = {
  curUser: null,
};

let initialChannelState = {
  curChannel: null,
};

let initialFavState = {
  favChannel: {},
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER:
      let payload = action.payload;
      state = { ...payload };
      return state;
  }
  return state;
};

const channelReducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case SET_CHANNEL:
      let payload = action.payload;
      state = { ...payload };
      return state;
  }
  return state;
};

const favReducer = (state = initialFavState, action) => {
  let payload;
  let newState = {};
  switch (action.type) {
    case SET_FAV_CHANNEL:
      payload = action.payload.favChannel;
      newState = { ...state.favChannel };
      newState[payload.channelId] = payload.channelName;
      return { favChannel: newState };
    case REMOVE_FAV_CHANNEL:
      payload = action.payload.favChannel;
      newState = { ...state.favChannel };
      delete newState[payload.channelId];
      return { favChannel: newState };
  }
  return state;
};

export const allReducers = combineReducers({
  userReducer,
  channelReducer,
  favReducer,
});
