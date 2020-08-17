export const SET_SUBTOTAL = 'SET_SUBTOTAL';
export const SET_PROMOTIONAL_DISCOUNT = 'SET_PROMOTIONAL_DISCOUNT';
export const SET_ORDER = 'SET_ORDER';
export const SET_SHIPPING_FEE = 'SET_SHIPPING_FEE';

export const setSubtotal = (payload) => ({
  type: SET_SUBTOTAL,
  payload,
});

export const setPromotionalDiscount = (payload) => ({
  type: SET_PROMOTIONAL_DISCOUNT,
  payload,
});

export const setOrder = (payload) => ({
  type: SET_ORDER,
  payload,
});

export const setShippingFee = (payload) => ({
  type: SET_SHIPPING_FEE,
  payload,
});
