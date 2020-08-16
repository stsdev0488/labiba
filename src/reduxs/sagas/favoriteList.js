import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import {
  GET_FAVORITE_LIST,
  GET_FAVORITE_LIST_REQUEST,
  GET_FAVORITE_LIST_SUCCESS,
  GET_FAVORITE_LIST_ERROR,
  CREATE_FAVORITE_ITEM,
  CREATE_FAVORITE_ITEM_REQUEST,
  CREATE_FAVORITE_ITEM_SUCCESS,
  CREATE_FAVORITE_ITEM_ERROR,
} from 'reduxs/actions/favoriteList';
import { favoriteApi } from 'services/apis';

function* getFavoriteList(action) {
  try {
    yield put({ type: GET_FAVORITE_LIST_REQUEST });
    const response = yield call(favoriteApi.getFavoriteList);
    if (response.status === 200) {
      yield put({
        type: GET_FAVORITE_LIST_SUCCESS,
        payload: response.data.data,
      });
    } else {
      yield put({
        type: GET_FAVORITE_LIST_ERROR,
        payload: 'Get Favorite List failed',
      });
    }
  } catch (error) {
    yield put({ type: GET_FAVORITE_LIST_ERROR, payload: error.response });
  }
}

function* createFavoriteItem(action) {
  try {
    yield put({ type: CREATE_FAVORITE_ITEM_REQUEST });
    const response = yield call(favoriteApi.createFavoriteItem, action.payload);
    if (response.status === 200) {
      yield put({
        type: CREATE_FAVORITE_ITEM_SUCCESS,
        payload: response.data.data,
      });
    } else {
      yield put({
        type: CREATE_FAVORITE_ITEM_ERROR,
        payload: 'Create Favorite failed',
      });
    }
  } catch (error) {
    yield put({ type: CREATE_FAVORITE_ITEM_ERROR, payload: error.response });
  }
}

const FavoriteSaga = function* Product() {
  yield takeEvery(GET_FAVORITE_LIST, getFavoriteList);
  yield takeEvery(CREATE_FAVORITE_ITEM, createFavoriteItem);
};

export default FavoriteSaga;
