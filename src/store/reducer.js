import { SET_CHANNEL, SET_USER } from "./action";
import { combineReducers } from "redux";
let initialUserState = {
  curUser: null,
};

let initialChannelState = {
  curChannel: null,
}

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
      state = { ...payload }
      return state;
  }
  return state;
}

export const allReducers = combineReducers({ userReducer,channelReducer });
