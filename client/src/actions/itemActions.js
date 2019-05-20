import {
  GET_ERRORS,
  GET_ITEM,
  GET_ITEMS,
  ITEM_LOADING,
  GET_LAST_TVID,
  CLEAR_DATA,
  CLEAR_ITEM,
  CLEAR_ERRORS,
  SEND_SUCCESS
} from "./types";
import axios from "axios";

// Insert a TV Series Record

export const addItem = (itemData, history) => dispatch => {
  axios
    .post("/api/items/add", itemData)
    .then(res => {
      history.push("/");
      dispatch(clearErrors());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update a TV Series Record

export const updateItem = itemData => dispatch => {
  const id = itemData.id;
  axios
    .post(`/api/items/id/${id}/edit`, itemData)
    .then(res => {
      dispatch(clearItem());
      dispatch(clearErrors());
      dispatch(getItemById(id));
      dispatch({
        type: SEND_SUCCESS,
        payload: "Successfully Updated"
      });
    })
    .catch(err => {
      dispatch({
        type: SEND_SUCCESS,
        payload: null
      });
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get TV Series item by id
export const getItemById = id => dispatch => {
  dispatch(setItemLoading());
  axios
    .get(`/api/items/id/${id}`)
    .then(res =>
      dispatch({
        type: GET_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all TV Series
export const getAllItems = () => dispatch => {
  dispatch(setItemLoading());
  axios
    .get(`/api/items/all`)
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get the last tvid
export const getLastTvid = () => dispatch => {
  dispatch(setItemLoading());
  axios
    .get(`/api/items/length`)
    .then(res =>
      dispatch({
        type: GET_LAST_TVID,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Item loading
export const setItemLoading = () => {
  return {
    type: ITEM_LOADING
  };
};

// Clear data
export const clearData = () => {
  return {
    type: CLEAR_DATA
  };
};

// Clear only one item (item used in edit component)
export const clearItem = () => {
  return {
    type: CLEAR_ITEM
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
