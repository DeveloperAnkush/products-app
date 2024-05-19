import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SnackbarState } from "../../utils/types";

const initialState: SnackbarState = {
  message: "",
  severity: "",
  snackbarActive: false,
};

export const SnackbarsSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar(
      state,
      action: PayloadAction<{ message: string; severity: string }>
    ) {
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.snackbarActive = true;
    },
    closeSnackbar(state) {
      state.message = "";
      state.severity = "success";
      state.snackbarActive = false;
    },
  },
});

export const { openSnackbar, closeSnackbar } = SnackbarsSlice.actions;
export default SnackbarsSlice.reducer;
