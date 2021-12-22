import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CSSProperties } from "react"

type StoreState = {
  status: MessageStatus;
  message: string;
  duration: number;
  style: SnackbarStyle;
  custom: CSSProperties | null;
}

export enum SnackbarStyle {
  error,
  success,
  warn,
  none,
  custom,
}

export enum MessageStatus {
  hidden,
  shown,
}

const initialState: StoreState = {
  status: MessageStatus.hidden,
  style: SnackbarStyle.none,
  duration: 3000,
  message: '',
  custom: null,
}

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<{message: string, duration?: number, style: SnackbarStyle, custom?: CSSProperties}>) => {
      return { 
        status: MessageStatus.shown ,
        style: action.payload.style, 
        duration: action.payload.duration ? action.payload.duration : 3000,
        message: action.payload.message, 
        custom: action.payload.custom ? action.payload.custom : null, 
      };
    },

    hide: () => {
      return {
        status: MessageStatus.hidden,
        style: SnackbarStyle.none,
        duration: 3000,
        message: '',
        custom: null,
      }
    }
  }
});

export const rSnackbarAction = snackbarSlice.actions;
export const snackbarReduser = snackbarSlice.reducer;
