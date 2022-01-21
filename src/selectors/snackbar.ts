import { CSSProperties, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rSnackbarAction, SnackbarStyle, StoreStateSnackbar } from "../redux/slice-snackbar";
import { RootState } from "../redux/store";

export const useSnackbarDispatchAction = () => {
  const dispatch = useDispatch();

  const _show = useCallback((payload: {
    message: string;
    duration?: number;
    style: SnackbarStyle;
    custom?: CSSProperties;
  }) => {
    dispatch(rSnackbarAction.show(payload));
  }, [dispatch] );

  const _hide = useCallback(() => {
    dispatch(rSnackbarAction.hide());
  }, [dispatch]);

  return {
    show: _show,
    hide: _hide,
  }
}

export const useSelectorSnackbar = () => {
  return useSelector<RootState['snackbar'], StoreStateSnackbar>(state => state);
}