import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { _getContents } from "../_temp/contents";
import { _getProfileById } from "../_temp/users";
import { AppDispatch, StoreState } from "./store";

const initialState: StoreState = {
  loading: false,
  error: null,
  initialized: false,
  data: [],
}

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    fetchStart: (state) => {
      return { ...state, loading: true }
    },
    fetchDone: (state, action: PayloadAction<{ data: any[] }>) => {
      const _data = state.data.concat(action.payload.data);
      return { loading: false, initialized: true, data: _data, error: null }
    },
    fetchError: (state) => {
      return { ...state, loading: false, error: rContentError.FETCH_ERROR }
    },
  }
});

export const fetchContents = async (dispatch: AppDispatch, query: {sort?: string, order?: -1|1, limit?: number, skip?: number } ): Promise<void> => {
  dispatch(rContentAction.fetchStart());
  try {
    let data = await _getContents(query);
    const getUserPromises = data.map(content => _getProfileById(content.user));
    const users = await Promise.all(getUserPromises);
    data = data.map(content => {
      content.user= users.find(user => user.id === content.user);
      return content;
    });
    dispatch(rContentAction.fetchDone({ data }));
  } catch(error) {
    dispatch(rContentAction.fetchError());;
  }
}

export const rContentAction = contentSlice.actions;
export const contentReducer = contentSlice.reducer;

export const rContentError = {
  FETCH_ERROR: 'Could not get events',
}
