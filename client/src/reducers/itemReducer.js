import {
  GET_ITEM,
  GET_ITEMS,
  ITEM_LOADING,
  GET_LAST_TVID,
  CLEAR_DATA,
  CLEAR_ITEM
} from "../actions/types";

const initialState = {
  item: null,
  items: null,
  lastTvid: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ITEM_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ITEM:
      return {
        ...state,
        item: action.payload,
        loading: false
      };
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case GET_LAST_TVID:
      return {
        ...state,
        lastTvid: action.payload,
        loading: false
      };
    case CLEAR_DATA:
      return {
        ...state,
        item: null,
        items: null,
        lastTvid: null,
        loading: false
      };
    case CLEAR_ITEM:
      return {
        ...state,
        item: null,
        lastTvid: null,
        loading: false
      };
    default:
      return state;
  }
}
