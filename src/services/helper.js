import axios from 'axios';
import { API_URL } from 'config';

/**
 * Create Axios Request handler
 * @param {string} target
 * @param {string} method
 * @param {bool} authorized
 * @param {object} data
 */
const apiHandler = (requestType, url, auth, data = undefined) =>
  axios({
    baseURL: API_URL,
    url,
    method: requestType,
    headers: { 'Content-Type': 'application/json' },
    data,
  });

export default apiHandler;
