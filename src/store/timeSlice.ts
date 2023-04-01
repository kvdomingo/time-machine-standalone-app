import { AlertColor } from "@mui/material";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash-es";
import moment from "moment";
import { CheckIn, TextLog } from "../types/checkIn";
import { DEFAULT_DATE_FORMAT } from "../utils/constants";
import { RootState } from "./store";

interface GlobalNotification {
  type: AlertColor;
  visible: boolean;
  message: string;
}

export interface TimeState {
  checkIns: CheckIn[];
  count: number;
  startDate: string;
  endDate: string;
  tagCache: string[];
  textLog: TextLog;
  globalNotification: GlobalNotification;
}

export const initialState: TimeState = {
  checkIns: [],
  count: 0,
  startDate: moment().format(DEFAULT_DATE_FORMAT),
  endDate: moment().format(DEFAULT_DATE_FORMAT),
  tagCache: [],
  textLog: {},
  globalNotification: {
    type: "info",
    visible: false,
    message: "",
  },
};

export const timeSlice = createSlice({
  name: "time",
  initialState: cloneDeep(initialState),
  reducers: {
    addCheckIn(state, action: PayloadAction<CheckIn>) {
      state.checkIns = [action.payload, ...state.checkIns];
      state.tagCache = [...new Set([...state.tagCache, action.payload.tag])];
    },
    updateCheckIn(state, action: PayloadAction<CheckIn>) {
      const index = state.checkIns.findIndex(c => c.id === action.payload.id);
      if (index === -1) return;

      state.checkIns[index] = action.payload;
      state.tagCache = [...new Set([...state.tagCache, action.payload.tag])];
    },
    deleteCheckIn(state, action: PayloadAction<string>) {
      const index = state.checkIns.findIndex(c => c.id === action.payload);
      if (index === -1) return;

      state.checkIns.splice(index, 1);
    },
    updateTagCache(state, action: PayloadAction<string[]>) {
      state.tagCache = action.payload;
    },
    updateCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    updateStartDate(state, action: PayloadAction<string>) {
      state.startDate = action.payload;
    },
    updateEndDate(state, action: PayloadAction<string>) {
      state.endDate = action.payload;
    },
    updateTextLog(state, action: PayloadAction<TextLog>) {
      state.textLog = action.payload;
    },
    updateGlobalNotification(state, action: PayloadAction<GlobalNotification>) {
      state.globalNotification = action.payload;
    },
    resetTimeMachine(state) {
      Object.assign(state, cloneDeep(initialState));
    },
  },
});

export const {
  addCheckIn,
  updateCheckIn,
  deleteCheckIn,
  updateGlobalNotification,
  updateTextLog,
  updateCount,
  updateTagCache,
  updateStartDate,
  updateEndDate,
  resetTimeMachine,
} = timeSlice.actions;

export const selectCheckIns = (state: RootState) => {
  const checkIns = [...state.time.checkIns];
  checkIns.sort((a, b) => b.start_time.localeCompare(a.start_time));
  return checkIns;
};

export const selectCount = (state: RootState) => state.time.count;

export const selectStartDate = (state: RootState) => state.time.startDate;

export const selectEndDate = (state: RootState) => state.time.endDate;

export const selectTagCache = (state: RootState) => state.time.tagCache;

export const selectTextLog = (state: RootState) => state.time.textLog;

export const selectGlobalNotification = (state: RootState) =>
  state.time.globalNotification;

export default timeSlice.reducer;
