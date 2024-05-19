import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/product.slice";
import snackbarReducer from "./slices/snackbar.slice";

const rootReducer = combineReducers({
  product: productReducer,
  snackbar: snackbarReducer,
});

const persistedState = localStorage.getItem("reduxState");
const initialState = persistedState ? JSON.parse(persistedState) : {};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
