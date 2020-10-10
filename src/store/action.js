export const SET_USER = "SET_USER";
export const SET_CHANNEL = "SET_CHANNEL";
export const SET_FAV_CHANNEL = "SET_FAV_CHANNEL";
export const REMOVE_FAV_CHANNEL = "REMOVE_FAV_CHANNEL";

export const setUser = (user) => {
  return {
    type: SET_USER,
    payload: {
      curUser: user,
    },
  };
};

export const setChannel = (channel) => {
  return {
    type: SET_CHANNEL,
    payload: {
      curChannel: channel,
    },
  };
};

export const setFavChannel = (channel) => {
  return {
    type: SET_FAV_CHANNEL,
    payload: {
      favChannel: channel,
    },
  };
};

export const removeFavChannel = (channel) => {
  return {
    type: REMOVE_FAV_CHANNEL,
    payload: {
      favChannel: channel,
    },
  };
};
