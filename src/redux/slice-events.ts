import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { formatISO } from "date-fns";
import { snackbarMessage } from "../definition/message";
import { _getEvents } from "../_temp/events";
import { GetQuery } from "./slice-profiles";
import { StoreState } from "./store";

export type EventFilter = {
  count: number;
  sort: string;
  order: -1 | 1;
  laterThan?: Date | null;
}

export interface EventFilterInStore extends Omit<EventFilter, 'laterThan'> {
  laterThan: string | null;
}
interface StoreEventState extends StoreState {
  filter: EventFilterInStore | null;
}

const initialState: StoreEventState = {
  loading: false,
  initialized: false,
  data: [],
  filter: null,
}

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    updateFilter: (state, action: PayloadAction<EventFilterInStore>) => {
      return { 
        ...state, 
        filter: action.payload 
      }
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
    },
  }
});

export const fetchEvents = async (query: GetQuery): Promise<any[]> => {
  try {
    let data = await _getEvents(query);
    data = data.map(item => {
      return {
        ...item,
        date: formatISO(item.date),
      }
    });
    return data;
  } catch (error) {
    throw snackbarMessage.ERROR
  }
}

export const rEventAction = eventSlice.actions;
export const eventReducer = eventSlice.reducer;
