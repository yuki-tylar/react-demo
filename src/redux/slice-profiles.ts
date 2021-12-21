import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { _getProfileById, _getProfiles } from "../_temp/users";
import { AppDispatch, StoreState } from "./store";

interface StoreEventState extends StoreState {
  selected: any
}

const initialState: StoreEventState = {
  selected: null,
  loading: false,
  initialized: false,
  data: [],
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    fetchStart: (state) => {
      return { ...state, loading: true }
    },
    fetchDone: (state, action: PayloadAction<{ data: any[] }>) => {
      const _data = state.data.concat(action.payload.data);
      return { ...state, loading: false, initialized: true, data: _data }
    },
    fetchError: (state) => {
      return { ...state, loading: false }
    },
    select: (state, action: PayloadAction<{data: any}>) => {
      return { ...state, selected: action.payload.data }
    }
  }
});

export const fetchProfiles = async (dispatch: AppDispatch, query: {sort?: string, order?: -1|1, limit?: number, skip?: number }): Promise<void> => {
  dispatch(rProfileAction.fetchStart());
  try {
    const data = await _getProfiles(query);
    dispatch(rProfileAction.fetchDone({ data }));
  } catch(error) {
    dispatch(rProfileAction.fetchError());
  }
}

export const fetchProfileById = async (dispatch: AppDispatch, id: string): Promise<void> => {
  dispatch(rProfileAction.fetchStart());
  try {
    const data = await _getProfileById(id);
    dispatch(rProfileAction.fetchDone({data: [data]}));
  } catch(error) {
    dispatch(rProfileAction.fetchError());
  }
}


export const rProfileAction = profileSlice.actions;
export const profileReducer = profileSlice.reducer;