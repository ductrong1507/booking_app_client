import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import hotelReducer from "./reducers/hotelReducer";
import transactionReducer from "./reducers/transactionReducer";

export const store = configureStore({
  reducer: {
    authReducer: authReducer,
    hotelReducer,
    transactionReducer,
  },
});
