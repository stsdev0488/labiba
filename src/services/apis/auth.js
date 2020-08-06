import apiHandler from '../helper';

/**
 * Send login request
 * @type Authentication
 * @param {*} { email, password }
 * @return success/failure, json message
 */
export const login = ({ email, password }) =>
  apiHandler('post', '/auth/login', false, {
    email,
    password,
  });

/**
 * Send register request
 * @type Authentication
 * @param {*} { fullname, email, password, facebookId }
 * @return success/failure, json message
 */
export const register = ({ fullname, email, password, facebookId }) =>
  apiHandler('post', '/auth/signup', false, {
    fullname,
    email,
    password,
    facebookId,
  });
