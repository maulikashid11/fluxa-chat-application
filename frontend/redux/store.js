import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/es/storage";

// import your slices
import authReducer from "./authSlice";
import messageReducer from "./messageSlice";    

// combine reducers
const rootReducer = combineReducers({
  user: authReducer,
  message: messageReducer,
});

// persist config
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"], // only persist user (recommended)
};

// wrap reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // required for redux-persist
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// persistor
export const persistor = persistStore(store);