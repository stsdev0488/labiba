import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  GET_PRODUCT,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR,
} from 'reduxs/actions/product';
import { productApi } from 'services/apis';

function* getProduct(action) {
  try {
    yield put({ type: GET_PRODUCT_REQUEST });
    const response = yield call(productApi.getProduct, action.payload);
    if (response.status === 200) {
      yield put({ type: GET_PRODUCT_SUCCESS, payload: response.data });
    }
  } catch (error) {
    yield put({ type: GET_PRODUCT_ERROR, payload: error.response });
  }
}

const ProductSaga = function* Product() {
  yield takeEvery(GET_PRODUCT, getProduct);
};

export default ProductSaga;
