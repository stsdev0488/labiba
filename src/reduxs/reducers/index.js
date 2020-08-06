import { combineReducers } from 'redux';
import auth from './auth';
import product from './product';

const appReducer = combineReducers({
  auth,
  product,
});

export default appReducer;
