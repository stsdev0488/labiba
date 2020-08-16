import apiHandler from 'services/helper';

export const getOrder = ({ products, shipping }) =>
  apiHandler('post', '/orders', false, { products, shipping });
