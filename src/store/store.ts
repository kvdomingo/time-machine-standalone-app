import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import timeReducer from "./timeSlice";

export const store = configureStore({
  reducer: {
    time: timeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
