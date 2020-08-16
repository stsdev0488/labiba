import apiHandler from 'services/helper';

export const createFavoriteItem = (name) =>
  apiHandler('post', '/favorites', false, { name });

export const getFavoriteList = () => apiHandler('get', '/favorites', false);
