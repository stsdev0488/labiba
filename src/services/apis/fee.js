import apiHandler from 'services/helper';

export const getShippingFee = (fee) =>
  apiHandler('get', `/shipping/calculate/${fee}`, false);
