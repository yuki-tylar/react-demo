import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ProfileFilter, rProfileAction } from "../redux/slice-profiles";
import { RootState } from "../redux/store";

export const useProfilesDispatchAction = () => {
  const dispatch = useDispatch();
  const _add = useCallback((profiles: any[], markAsInitialized: boolean) => dispatch( rProfileAction.add({data: profiles, markAsInitialized: markAsInitialized})), [dispatch])
  const _updateFilter = useCallback((filter: ProfileFilter) => dispatch( rProfileAction.updateFilter(filter)), [dispatch]);

  return {
    add: _add,
    updateFilter: _updateFilter,
  }
}

export const useSelectorProfiles = () => {
  return useSelector<RootState, any[]>(state => state.profile.data);
}

export const useSelectorProfileFilter = () => {
  return useSelector<RootState, ProfileFilter|null>(state => state.profile.filter);
}

export const useSelectorProfileIsInitialized = () => {
  return useSelector<RootState, boolean>(state => state.profile.initialized);
}