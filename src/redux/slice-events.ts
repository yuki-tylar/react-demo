import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { _getEvents } from "../_temp/events";
import { AppDispatch, StoreState } from "./store";

const initialState: StoreState = {
  loading: false,
  error: null,
  initialized: false,
  data: [],
}

export const eventSlice = createSlice({
  name: 'event',
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
      return { ...state, loading: false, error: rEventError.FETCH_ERROR }
    },
    filter: (state, action: PayloadAction<{ sort?: string, order?: 1 | -1, laterThan?: Date, skip?: number, limit?: number }>) => {
      const newState = { ...state };

      let results = newState.data;
      if (!!action.payload.laterThan) {
        results = results.filter(item => item.date.getTime() - action.payload.laterThan!.getTime() >= 0);
      }
      if (action.payload.sort) {
        const sort = action.payload.sort;
        const order = action.payload.order === -1 ? -1 : 1;
        results = results.sort((a, b) => {
          if (a[sort] instanceof Date) {
            return (a[sort].getTime() - b[sort].getTime) * order;
          } else if (typeof a[sort] === 'number') {
            return (a[sort] - b[sort]) * order;
          } else if (typeof a[sort] === 'string') {
            return (a[sort].toUpperCase() - b[sort].toUpperCase()) * order;
          } else {
            return 1;
          }
        });
      }
      const skip = action.payload.skip || 0;
      const limit = action.payload.limit || 10;
      results = results.slice(skip, limit);

      newState.data = results;
      return newState;
    },
  }
});

export const fetchEvents = async (dispatch: AppDispatch, query: {sort?: string, order?: -1|1, limit?: number, skip?: number } ): Promise<void> => {
  dispatch(rEventAction.fetchStart());
  try {
    let data = await _getEvents(query);
    data = data.map(item => {
      item.date = moment(item.date).format();
      return item;
    });

    dispatch(rEventAction.fetchDone({ data }));  
  } catch(error) {
    console.log(error)
    dispatch(rEventAction.fetchError());
  }
}

export const rEventAction = eventSlice.actions;
export const eventReducer = eventSlice.reducer;

export const rEventError = {
  FETCH_ERROR: 'Could not get events',
}
