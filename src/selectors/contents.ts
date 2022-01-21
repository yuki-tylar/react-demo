import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ContentsFilter, rContentAction } from "../redux/slice-contents";
import { RootState } from "../redux/store";

export const useContentsDispatchAction = () => {
  const dispatch = useDispatch();
  const _add = useCallback((items: any[], markAsInitialized: boolean) => dispatch(rContentAction.add({ data: items, markAsInitialized: markAsInitialized })), [dispatch]);
  const _updateFilter = useCallback((filter: ContentsFilter) => dispatch(rContentAction.updateFilter(filter)), [dispatch]);

  return {
    add: _add,
    updateFilter: _updateFilter,
  }
}

export const useSelectorContents = () => {
  return useSelector<RootState, any[]>(state => state.content.data);
}

export const useSelectorContentIsInitialized = () => {
  return useSelector<RootState, boolean>(state => state.content.initialized);
}

export const useSelectorContentFilter = () => {
  return useSelector<RootState, ContentsFilter | null>(state => state.content.filter);
}