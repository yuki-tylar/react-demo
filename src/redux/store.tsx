import { configureStore } from "@reduxjs/toolkit";
import { connect, ConnectedProps, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authReducer } from "./slice-auth";
import { contentReducer } from "./slice-contents";
import { eventReducer } from './slice-events'
import { profileReducer } from "./slice-profiles";
import { settingReducer } from "./slice-settings";
import { snackbarReduser } from "./slice-snackbar";

export const store = configureStore({
  reducer: {
    event: eventReducer,
    profile: profileReducer,
    content: contentReducer,
    setting: settingReducer,
    auth: authReducer,
    snackbar: snackbarReduser,
  },
});

export const connector = connect((state: RootState) => state);
export const authConnector = connect(({auth}: RootState) => { return {auth}; })
export const eventConnector = connect(({event, auth}: RootState) => {return {event, auth}; });
export const profileConnector = connect(({profile, auth}: RootState) => { return {profile, auth}; });
export const contentConnector = connect(({content, auth}: RootState) => { return {content, auth}; });
export const settingConnector = connect(({setting, auth}: RootState) => { return {setting, auth}; });
export const snackbarConnector = connect(({snackbar}: RootState) => { return {snackbar}; });
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type PropsWithRedux = ConnectedProps<typeof connector>
export type PropsWithReduxAuth = ConnectedProps<typeof authConnector>
export type PropsWithReduxEvent = ConnectedProps<typeof eventConnector>
export type PropsWithReduxProfile = ConnectedProps<typeof profileConnector>
export type PropsWithReduxContent = ConnectedProps<typeof contentConnector>
export type PropsWithReduxSetting = ConnectedProps<typeof settingConnector>
export type PropsWithReduxSnackbar = ConnectedProps<typeof snackbarConnector>

export type StoreState = {
  loading: boolean;
  initialized: boolean;
  data: any[];
}