import { configureStore } from "@reduxjs/toolkit";
import { connect, ConnectedProps, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { contentReducer } from "./slice-contents";
import { eventReducer } from './slice-events'
import { profileReducer } from "./slice-profiles";

export const store = configureStore({
  reducer: {
    event: eventReducer,
    profile: profileReducer,
    content: contentReducer,
  },
});

export const connector = connect((state: RootState) => state);
export const eventConnector = connect(({event}: RootState) => {return {event}; });
export const profileConnector = connect(({profile}: RootState) => { return {profile}; });
export const contentConnector = connect(({content}: RootState) => { return {content}; });
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type PropsWithReduxEvent = ConnectedProps<typeof eventConnector>
export type PropsWithReduxProfile = ConnectedProps<typeof profileConnector>
export type PropsWithReduxContent = ConnectedProps<typeof contentConnector>

export type StoreState = {
  loading: boolean;
  error: string | null;
  initialized: boolean;
  data: any[];
}