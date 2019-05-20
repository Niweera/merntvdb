import {
  GET_ITEM,
  GET_ITEMS,
  ITEM_LOADING,
  GET_LAST_TVID,
  CLEAR_DATA,
  CLEAR_ITEM,
  SEND_SUCCESS
} from "../actions/types";

const initialState = {
  item: null,
  items: null,
  lastTvid: null,
  loading: false,
  success: null
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
    case SEND_SUCCESS:
      return {
        ...state,
        success: action.payload,
        loading: false
      };
    case CLEAR_DATA:
      return {
        ...state,
        item: null,
        lastTvid: null,
        loading: false,
        success: null
      };
    case CLEAR_ITEM:
      return {
        ...state,
        item: null,
        lastTvid: null,
        loading: false,
        success: null
      };
    default:
      return state;
  }
}
