import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  searchAction: false,
  searchListArr: [],
};

const hotelReducer = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    searchHotelAction: (state, action) => {
      state.searchAction = true;
      state.searchListArr = action.payload;
    },
  },
});

export const { searchHotelAction } = hotelReducer.actions;

export default hotelReducer.reducer;

// ------action thunk -----------
export const searchHotelApi = (searchData) => {
  return async (dispatch) => {
    try {
      const responseAPI = await axios({
        url: "http://localhost:5000/api/hotel/search",
        method: "POST",
        data: searchData,
      });

      dispatch(searchHotelAction(responseAPI.data.result));
    } catch (error) {
      console.log("searchHotelApi", error);
    }
  };
};
