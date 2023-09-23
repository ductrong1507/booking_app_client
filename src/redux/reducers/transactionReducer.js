import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";

const initialState = {
  transactionList: [],
};

const transactionReducer = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    getTransactionApi: (state, action) => {
      state.transactionList = action.payload;
    },
  },
});

export const { getTransactionApi } = transactionReducer.actions;

export default transactionReducer.reducer;

// ------action thunk -----------
export const getTransactionApiActionThunk = (userId) => {
  return async (dispatch) => {
    try {
      const responseAPI = await axios({
        url: `${API_BASE_URL}/api/transaction/${userId}`,
        method: "GET",
      });

      dispatch(getTransactionApi(responseAPI.data.result));
    } catch (error) {
      console.log("getTransactionApi", error);
    }
  };
};
