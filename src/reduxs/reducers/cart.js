import {
  SET_SUBTOTAL,
  SET_PROMOTIONAL_DISCOUNT,
  SET_ORDER,
  SET_SHIPPING_FEE,
} from 'reduxs/actions/cart';

const initialState = {
  subTotal: 0,
  totalCount: 0,
  promotionalDiscount: 0,
  shippingFee: 0,
  order: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SUBTOTAL:
      return {
        ...state,
        subTotal: action.payload.subTotal,
        totalCount: action.payload.totalCount,
      };
    case SET_PROMOTIONAL_DISCOUNT:
      return {
        ...state,
        promotionalDiscount: action.payload.discount,
      };
    case SET_ORDER:
      return {
        ...state,
        order: {
          ...state.order,
          ...action.payload,
        },
      };
    case SET_SHIPPING_FEE:
      return {
        ...state,
        shippingFee: action.payload,
      };
    default:
      return state;
  }
}
