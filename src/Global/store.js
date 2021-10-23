import { configureStore } from "@reduxjs/toolkit";
import myReducer from "./taskState";

export const store = configureStore({
  reducer: { myReducer },
});
