import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { snackbarMessage } from "../definition/message";
import { _getProfileById, _getProfiles } from "../_temp/users";
import { AppDispatch, StoreState } from "./store";

export type GetQuery = {
  limit?: number;
  skip?: number;
  sort?: string;
  order?: -1|1;
}

export type ProfileFilter = {
  count: number,
  sort: string, 
  order: -1|1, 
}
interface StoreProfileState extends StoreState {
  filter: ProfileFilter | null;
}

const initialState: StoreProfileState = {
  loading: false,
  initialized: false,
  data: [],
  filter: null,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<ProfileFilter>) => {
      return { ...state, filter: action.payload }
    },
    add: (state, action: PayloadAction<{ data: any[], markAsInitialized: boolean }>) => {
      const dataNext = Array.from(state.data);
      action.payload.data.forEach(data => {
        const idx = dataNext.findIndex(profile => profile.id === data.id);
        if(idx >= 0) {
          dataNext[idx] = {...state.data[idx], ...data} 
        } else {
          dataNext.push(data);
        }
      });
      return {...state, initialized: state.initialized || action.payload.markAsInitialized, data: dataNext};
    }
  }
});

export const fetchProfiles = async (dispatch: AppDispatch, query: GetQuery): Promise<any[]> => {
  try {
    const data = await _getProfiles(query);
    dispatch(rProfileAction.add({data: data, markAsInitialized: true}));
    return data;
  } catch(error) {
    throw snackbarMessage.ERROR;
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