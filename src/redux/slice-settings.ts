import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StoreSettingState = {
  appearance: 'dark' | 'light';
}

const initialState: StoreSettingState = {
  appearance: 'light',
}

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    changeAppearance: (state, action: PayloadAction<StoreSettingState['appearance']>) => {
      return { ...state, appearance: action.payload };
    }
  }
});

export const rSettingAction = settingSlice.actions;
export const settingReducer = settingSlice.reducer;