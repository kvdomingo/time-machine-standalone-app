import {
  TypedUseSelectorHook,
  useDispatch as useDefaultDispatch,
  useSelector as useDefaultSelector,
} from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useDispatch = () => useDefaultDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;
