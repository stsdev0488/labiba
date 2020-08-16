import apiHandler from 'services/helper';

export const getProduct = (code) =>
  apiHandler('get', `/products/${code}`, false);

  export const getProductAlternatives = (code) =>
  apiHandler('get', `/products/${code}/alternatives`, false);
