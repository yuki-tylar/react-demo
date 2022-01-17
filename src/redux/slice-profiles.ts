import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { snackbarMessage } from "../definition/message";
import { _getProfileById, _getProfiles } from "../_temp/users";
import { AppDispatch, StoreState } from "./store";

interface StoreProfileState extends StoreState {
  error: boolean;
}

const initialState: StoreProfileState = {
  loading: false,
  initialized: false,
  data: [],
  error: false,
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
    add: (state, action: PayloadAction<{ data: any[], markAsInitialized: boolean }>) => {
      const _data = state.data.concat(action.payload.data);
      return {...state, initialized: state.initialized || action.payload.markAsInitialized, data: _data};
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

export const fetchProfileById = async (dispatch: AppDispatch, id: string): Promise<any> => {
  // dispatch(rProfileAction.fetchStart());
  try {
    const data = await _getProfileById(id);
    dispatch(rProfileAction.add({data: [data], markAsInitialized: false}));
    return data;
    // dispatch(rProfileAction.fetchDone({data: [data]}));
  } catch(error) {
    throw snackbarMessage.FETCH_PROFILES_ERROR;
    // dispatch(rProfileAction.fetchError());
  }
}

export const rProfileAction = profileSlice.actions;
export const profileReducer = profileSlice.reducer;