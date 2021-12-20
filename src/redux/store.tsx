import { configureStore } from "@reduxjs/toolkit";
import { connect, ConnectedProps, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { contentReducer } from "./slice-contents";
import { eventReducer } from './slice-events'
import { profileReducer } from "./slice-profiles";
import { settingReducer } from "./slice-settings";

export const store = configureStore({
  reducer: {
    event: eventReducer,
    profile: profileReducer,
    content: contentReducer,
    setting: settingReducer,
  },
});

export const connector = connect((state: RootState) => state);
export const eventConnector = connect(({event}: RootState) => {return {event}; });
export const profileConnector = connect(({profile}: RootState) => { return {profile}; });
export const contentConnector = connect(({content}: RootState) => { return {content}; });
export const settingConnector = connect(({setting}: RootState) => { return {setting}; });
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type PropsWithRedux = ConnectedProps<typeof connector>
export type PropsWithReduxEvent = ConnectedProps<typeof eventConnector>
export type PropsWithReduxProfile = ConnectedProps<typeof profileConnector>
export type PropsWithReduxContent = ConnectedProps<typeof contentConnector>
export type PropsWithReduxSetting = ConnectedProps<typeof settingConnector>

export type StoreState = {
  loading: boolean;
  error: string | null;
  initialized: boolean;
  data: any[];
}