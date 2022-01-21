import { parseISO } from "date-fns";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"
import { EventFilter, EventFilterInStore, rEventAction } from "../redux/slice-events";
import { RootState } from "../redux/store";

export const useEventsDispatchAction = () => {
  const dispatch = useDispatch();
  const _add = useCallback((profiles: any[], markAsInitialized: boolean) => dispatch(rEventAction.add({ data: profiles, markAsInitialized: markAsInitialized })), [dispatch])
  const _updateFilter = useCallback((filter: EventFilterInStore) => dispatch(rEventAction.updateFilter(filter)), [dispatch]);

  return {
    add: _add,
    updateFilter: _updateFilter,
  }
}

export const useSelectorEvents = () => {
  const events = useSelector<RootState, any[]>(state => state.event.data);
  return events.map(e => {
    return {...e, date: parseISO(e.date)}
  });
}

export const useSelectorEventFilter = (): EventFilter => {
  const filter = useSelector<RootState, EventFilterInStore | null>(state => state.event.filter);
  return {
    ...filter,  
    ...filter?.laterThan && { laterThan: parseISO(filter.laterThan) }
  } as EventFilter
}

export const useSelectorEventIsInitialized = () => {
  return useSelector<RootState, boolean>(state => state.event.initialized);
}