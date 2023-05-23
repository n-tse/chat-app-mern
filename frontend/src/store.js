// stores our reducers and state

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import appApi from "./services/appApi";

// persist our state so even if we refresh, user won't get logged out
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

// redux thunk help us with async operations, like signing up the user
import thunk from "redux-thunk";

const reducer = combineReducers({
  user: userSlice,
  [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blackList: [appApi.reducerPath],
};

// persist our store
const persistedReducer = persistReducer(persistConfig, reducer);

// create the store
const store = configureStore({
  reducer: persistedReducer,

  //allows us  to make async requests
  middleware: [thunk, appApi.middleware],
});

export default store;
