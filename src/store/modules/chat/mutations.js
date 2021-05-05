export const setUserDetails = (state, userDetails) => {
  state.userDetails = userDetails;
};

export const addUser = (state, user) => {
  state.users = {
    ...state.users,
    [user.id]: user.data,
  };
};

export const updateUser = (state, user) => {
  state.users = {
    ...state.users,
    [user.id]: {
      ...state.users[user.id],
      ...user.data,
    },
  };
};

export const addMessage = (state, message) => {
  state.messages = {
    ...state.messages,
    [message.id]: message.data,
  };
};

export const clearMessages = (state) => {
  state.messages = {};
};
