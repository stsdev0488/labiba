import { all } from 'redux-saga/effects';
import AuthSaga from './auth';
import ProductSaga from './product';

export default function* mainSaga() {
  yield all([AuthSaga(), ProductSaga()]);
}
