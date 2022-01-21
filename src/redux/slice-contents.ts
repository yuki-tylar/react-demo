import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { snackbarMessage } from "../definition/message";
import { _getContents } from "../_temp/contents";
import { _getProfileById } from "../_temp/users";
import { AppDispatch, StoreState } from "./store";

export type ContentsFilter = {
  count: number;
}

interface StoreStateContents extends StoreState{
  filter: ContentsFilter | null;
}

const initialState: StoreStateContents = {
  loading: false,
  initialized: false,
  data: [],
  filter: null,
}

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<ContentsFilter>) => {
      return {...state, filter: action.payload};
    },
    add: (state, action: PayloadAction<{ data: any[], markAsInitialized: boolean }>) => {
      const dataNext = Array.from(state.data);
      action.payload.data.forEach(data => {
        const idx = dataNext.findIndex(content => content.id === data.id);
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

export const fetchContents = async (query: {sort?: string, order?: -1|1, limit?: number, skip?: number } ): Promise<any[]> => {
  try {
    let data = await _getContents(query);
    const getUserPromises = data.map(item => _getProfileById(item.user));
    const users = await Promise.all(getUserPromises);
    data = data.map(item => {
      return {
        ...item,
        user: users.find(user => user.id === item.user)
      }
    });
    return data;
  } catch(error) {
    throw snackbarMessage.ERROR;
  }
}

export const rContentAction = contentSlice.actions;
export const contentReducer = contentSlice.reducer;