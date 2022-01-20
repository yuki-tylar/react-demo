import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { snackbarMessage } from "../definition/message";
import { fetchProfileById } from "../redux/slice-profiles";
import { rSnackbarAction, SnackbarStyle } from "../redux/slice-snackbar";
import { RootState } from "../redux/store";
import { MyLoader } from "../widgets/loader";
import { ProfileUI } from "./profile-ui";

type Status = 'needFetch' | 'fetching' | 'ready' | 'error';

export function Profile() {
  const params = useParams<{ id?: string }>();
  // const navigate = useNavigate();

  const dispatch = useDispatch();
  const profiles = useSelector((state: RootState) => state.profile.data);

  const id = params.id;
  let _profile: any = profiles.find(data => data.id === id) || null;
  const _status: Status = !id ? 'error' : _profile ? 'ready' : 'needFetch';

  const profile = useRef<any>(_profile)
  let [status, changeStatus] = useState<Status>(_status)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        profile.current = await fetchProfileById(dispatch, id!);
        changeStatus('ready');
      } catch (error) {
        changeStatus('error');
      }
    }

    switch (status) {
      case 'needFetch':
        changeStatus('fetching');
        fetchProfile();
        break;
      case 'error':
        dispatch(rSnackbarAction.show({ message: snackbarMessage.ERROR, style: SnackbarStyle.error }));
        break;
      default:
    }
  }, [status, dispatch, id])

  return (
    status === 'error' ?
      <div>ERROR!</div> :
      status === 'fetching' ?
        <MyLoader /> :
        profile.current ?
          <ProfileUI profile={profile.current} /> :
          <div>NO USER DATA</div>
  );
}
