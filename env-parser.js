/* eslint-disable no-console */
/* eslint-disable arrow-body-style */

const dotenv = require('dotenv');

module.exports = () => {
  const parsedEnv = dotenv.config().parsed || {};

  const safeStringify = (value) => {
    try {
      return typeof value === 'string'
        ? JSON.stringify(value)
        : value;
    } catch {
      return value;
    }
  };

  const createEnvReducer = (source, parse) => (env, key) => ({
    ...env,
    [key]: parse(source[key]),
  });

  const envReducer = createEnvReducer(parsedEnv, safeStringify);

  return Object
    .keys(parsedEnv)
    .reduce(envReducer, {});
};
