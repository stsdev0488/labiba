import apiHandler from '../helper';

/**
 * Send login request
 * @type Authentication
 * @param {*} { email, password }
 * @return success/failure, json message
 */
export const login = ({ email, password }) =>
  apiHandler('post', '/users/login', false, {
    email,
    password,
  });

/**
 * Send register request
 * @type Authentication
 * @param {*} { email, password, confirmPassword }
 * @return success/failure, json message
 */
export const register = ({ email, password, confirmPassword }) =>
  apiHandler('post', '/users/register', false, {
    email,
    password,
    confirm_password: confirmPassword,
  });
