import { all } from 'redux-saga/effects';
import AuthSaga from './auth';

export default function* mainSaga() {
  yield all([AuthSaga()]);
}
