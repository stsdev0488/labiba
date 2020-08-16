import { combineReducers } from 'redux';
import auth from './auth';
import product from './product';
import favoriteList from './favoriteList';

const appReducer = combineReducers({
  auth,
  product,
  favoriteList,
});

export default appReducer;
