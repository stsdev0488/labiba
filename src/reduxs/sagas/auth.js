import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import {
  AUTH_LOGIN,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_ERROR,
  AUTH_REGISTER,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_ERROR,
} from '../actions/auth';
import { auth } from 'services/apis';

function* login(action) {
  try {
    yield put({ type: AUTH_LOGIN_REQUEST });
    const response = yield call(auth.login, action.payload);
    if (response.status === 200) {
      yield put({ type: AUTH_LOGIN_SUCCESS, payload: response.data });
    } else {
      yield put({ type: AUTH_LOGIN_ERROR, payload: response.data });
    }
  } catch (error) {
    yield put({
      type: AUTH_LOGIN_ERROR,
      payload: error.response.data.error,
    });
  }
}

function* register(action) {
  try {
    yield put({ type: AUTH_REGISTER_REQUEST });
    const response = yield call(auth.register, action.payload);
    if (response.status === 200 || response.status === 201) {
      AsyncStorage.setItem('user', JSON.stringify(response.data));
      yield put({ type: AUTH_REGISTER_SUCCESS, payload: response.data });
    } else {
      yield put({ type: AUTH_REGISTER_ERROR, payload: response.data });
    }
  } catch (error) {
    yield put({
      type: AUTH_REGISTER_ERROR,
      payload: error.response.data.error,
    });
  }
}

const AuthSaga = function* Auth() {
  yield takeEvery(AUTH_LOGIN, login);
  yield takeEvery(AUTH_REGISTER, register);
};

export default AuthSaga;
