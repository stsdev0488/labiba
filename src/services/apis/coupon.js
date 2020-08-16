import apiHandler from 'services/helper';

export const getCoupon = (coupon) =>
  apiHandler('get', `/coupons/${coupon}`, false);
