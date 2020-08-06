import apiHandler from 'services/helper';

export const getProduct = (code) =>
  apiHandler('get', `/product/${code}`, false);
