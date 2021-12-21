import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { snackbarMessage } from "../definition/message";
import { _getProfile } from "../_temp/users";
import { MessageStyle, rSnackbarAction } from "./slice-snackbar";
import { AppDispatch } from "./store";

type AuthStoreState = {
  status: 'notLoggedIn' | 'notChecked' | 'checking' | 'loggedIn';
  data: any;
}

const initialState: AuthStoreState = {
  status: 'notChecked',
  data: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchStart: (state) => {
      return { ...state, status: 'checking' }
    },
    fetchDone: (state, action: PayloadAction<{ data: any }>) => {
      return { 
        status: action.payload.data ? 'loggedIn' : 'notLoggedIn', 
        data: action.payload.data ?  action.payload.data : null, 
      }
    },
    fetchError: (state) => {
      return { ...state, status: 'notLoggedIn', }
    },
  }
});

export const authenticate = async (dispatch: AppDispatch): Promise<boolean> => {
  dispatch(rAuthAction.fetchStart());
  const token = '';

  try {
    const user = await _getProfile({ token });
    dispatch( rAuthAction.fetchDone({data: user}) );
    return true;

  } catch (error) {
    dispatch( rAuthAction.fetchDone({data: null}) );
    return false;
  }
}

export const authenticateByEmail = async (dispatch: AppDispatch, data: {email: string, password: string}): Promise<boolean> => {
  dispatch(rAuthAction.fetchStart());
  try {
    const user = await _getProfile(data);
    dispatch( rAuthAction.fetchDone({data: user}));
    dispatch( rSnackbarAction.show({message: snackbarMessage.SIGNIN_SUCCESS, style: MessageStyle.none }));
    return true;
  } catch (error) {
    dispatch( rAuthAction.fetchError());
    dispatch( rSnackbarAction.show({message: snackbarMessage.SIGNIN_ERROR, style: MessageStyle.error }));
    return false;
  }
}

export const rAuthAction = authSlice.actions;
export const authReducer = authSlice.reducer;