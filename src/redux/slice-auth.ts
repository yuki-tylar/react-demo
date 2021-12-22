import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { snackbarMessage } from "../definition/message";
import { _getProfile } from "../_temp/users";
import { SnackbarStyle, rSnackbarAction } from "./slice-snackbar";
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
        data: action.payload.data ? action.payload.data : null,
      }
    },
    fetchError: (state) => {
      return { ...state, status: 'notLoggedIn', }
    },

    logout: (state) => {
      return { status: 'notLoggedIn', data: null }
    },
  }
});

export const authenticate = async (dispatch: AppDispatch): Promise<boolean> => {
  const token = localStorage.getItem('token');
  if (token) {
    dispatch(rAuthAction.fetchStart());
    try {
      const user = await _getProfile({ token });
      dispatch(rAuthAction.fetchDone({ data: user }));
      return true;

    } catch (error) {
      dispatch(rAuthAction.fetchDone({ data: null }));
      return false;
    }
  } else {
    dispatch(rAuthAction.fetchDone({ data: null }));
    return false;
  }
}

export const authenticateByEmail = async (dispatch: AppDispatch, data: { email: string, password: string }): Promise<boolean> => {
  dispatch(rAuthAction.fetchStart());
  try {
    const user = await _getProfile(data);
    dispatch(rAuthAction.fetchDone({ data: user }));
    dispatch(rSnackbarAction.show({ message: snackbarMessage.SIGNIN_SUCCESS, style: SnackbarStyle.none }));
    localStorage.setItem('token', user.token);
    return true;
  } catch (error) {
    dispatch(rAuthAction.fetchError());
    dispatch(rSnackbarAction.show({ message: snackbarMessage.SIGNIN_ERROR, style: SnackbarStyle.error }));
    return false;
  }
}

export const logout = (dispatch: AppDispatch) => {
  dispatch(rAuthAction.fetchDone({data: null}));
  localStorage.removeItem('token');
  dispatch(rSnackbarAction.show({message: snackbarMessage.SIGNOUT_SUCCESS, style: SnackbarStyle.none}));
  return;
}

export const rAuthAction = authSlice.actions;
export const authReducer = authSlice.reducer;