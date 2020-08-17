import { combineReducers } from 'redux';
import auth from './auth';
import product from './product';
import favoriteList from './favoriteList';
import cart from './cart';

const appReducer = combineReducers({
  auth,
  product,
  favoriteList,
  cart,
});

export default appReducer;
