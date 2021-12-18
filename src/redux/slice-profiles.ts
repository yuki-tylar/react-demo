import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type ProfileState = {
  initialized: boolean;
  data: any[];
}

const initialState: ProfileState = {
  initialized: false,
  data: [],
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addProfile: (state, action: PayloadAction<any>) => {
      const newState = {...state, initialized: true};
      switch(action.type) {
        case ProfileReducerItem.ADD: newState.data.push(action.payload); break;
        case ProfileReducerItem.ADD_AT_FIRST: newState.data.unshift(action.payload); break;
        default: newState.data.push(action.payload);
      }
      return newState;
    }
  }
});

export const { addProfile } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;

export const ProfileReducerItem = {
  ADD: 'ADD',
  ADD_AT_FIRST: 'ADD_AT_FIRST',
}