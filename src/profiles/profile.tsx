import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { snackbarMessage } from "../definition/message";
import { fetchProfileById } from "../redux/slice-profiles";
import { SnackbarStyle } from "../redux/slice-snackbar";
import { useProfilesDispatchAction, useSelectorProfiles } from "../selectors/profiles";
import { useSnackbarDispatchAction } from "../selectors/snackbar";
import { MyLoader } from "../widgets/loader";
import { NoContent } from "../widgets/no-content";
import { ProfileUI } from "./profile-ui";

type Status = 'needFetch' | 'fetching' | 'ready' | 'error';

export function Profile() {
  const params = useParams<{ id?: string }>();
  const dispatcher = useProfilesDispatchAction();
  const dispatcherSnackbar = useSnackbarDispatchAction();
  const profiles = useSelectorProfiles();

  const id = params.id;

  let _profile: any = profiles.find(data => data.id === id) || null;
  let [profile, setProfile] = useState<any | null>(_profile);

  const _status: Status = !id ? 'error' : _profile ? 'ready' : 'needFetch';
  let [status, changeStatus] = useState<Status>(_status)

  useEffect(() => {
    const fetchProfile = async () => {
      changeStatus('fetching');
      let profile = null;
      try {
        profile = await fetchProfileById(id!);
        dispatcher.add([profile], false);
        changeStatus('ready');
      } catch (error) {
        changeStatus('error');
        profile = null;
      } finally {
        setProfile(profile);
      }
    }

    switch (status) {
      case 'needFetch':
        fetchProfile();
        break;
      case 'error':
        dispatcherSnackbar.show({
          message: snackbarMessage.ERROR,
          style: SnackbarStyle.error
        })
        break;
      default:
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    status === 'error' ?
      <div>ERROR!</div> :
      status === 'fetching' ?
        <MyLoader /> :
        profile ?
          <ProfileUI profile={profile} /> :
          <NoContent message='Profile not found!' />
  );
}
