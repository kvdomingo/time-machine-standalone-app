import { Action, ThunkAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import localForage from "localforage";
import { persistReducer, persistStore } from "redux-persist";
import timeReducer from "./timeSlice";

const rootReducer = combineReducers({
  time: timeReducer,
});

const persistConfig = {
  key: "root",
  storage: localForage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
