import { SET_USER } from "./action";
import { combineReducers } from "redux";
let initialState = {
  curUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      let payload = action.payload;
      state = { ...payload };
      return state;
  }
  return state;
};

export const allReducers = combineReducers({ userReducer });
