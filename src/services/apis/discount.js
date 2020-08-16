import apiHandler from 'services/helper';

export const getDiscount = () =>
  apiHandler('get', '/discounts/promotional', false);
