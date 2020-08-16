import {
  GET_FAVORITE_LIST_REQUEST,
  GET_FAVORITE_LIST_SUCCESS,
  GET_FAVORITE_LIST_ERROR,
  CREATE_FAVORITE_ITEM_REQUEST,
  CREATE_FAVORITE_ITEM_SUCCESS,
  CREATE_FAVORITE_ITEM_ERROR,
} from 'reduxs/actions/favoriteList';

const dataSchema = {
  loading: false,
  success: false,
  error: null,
  data: {},
};

const initialState = {
  favoriteList: {
    ...dataSchema,
    data: [],
  },
  create: {
    ...dataSchema,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FAVORITE_LIST_REQUEST:
      return {
        ...state,
        favoriteList: {
          ...state.favoriteList,
          loading: true,
          success: false,
          error: null,
        },
      };
    case GET_FAVORITE_LIST_SUCCESS:
      return {
        ...state,
        favoriteList: {
          loading: false,
          success: true,
          error: null,
          data: action.payload,
        },
      };
    case GET_FAVORITE_LIST_ERROR:
      return {
        ...state,
        favoriteList: {
          ...state.favoriteList,
          loading: false,
          success: false,
          error: action.payload,
        },
      };
    case CREATE_FAVORITE_ITEM_REQUEST:
      return {
        ...state,
        create: {
          ...state.create,
          loading: true,
          success: false,
          error: false,
        },
      };
    case CREATE_FAVORITE_ITEM_SUCCESS:
      console.log('success ', action)
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          success: true,
          error: null,
          data: action.payload,
        },
        favoriteList: {
          ...state.favoriteList,
          data: [...state.favoriteList.data, { ...action.payload }],
        },
      };
    case CREATE_FAVORITE_ITEM_ERROR:
      return {
        ...state,
        create: {
          ...state.create,
          loading: false,
          success: false,
          error: null,
        },
      };
    default:
      return state;
  }
}
