/* eslint-disable no-shadow */

export const isUserLoggedIn = (state) => !!state.userDetails.id;

export const contacts = (state) => (
  Object
    .keys(state.users)
    .filter((key) => key !== state.userDetails.id)
    .reduce((contacts, key) => ({ ...contacts, [key]: state.users[key] }), {}));
