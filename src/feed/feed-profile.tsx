import { createElement, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProfiles, GetQuery, ProfileFilter, rProfileAction } from "../redux/slice-profiles";
import { profileConnector, PropsWithReduxProfile, RootState } from "../redux/store";
import { AspectRatio, FittedBox } from "../widgets/box";
import { Card } from "../widgets/card";
import { FeedRootProps } from "./base";
import { SwipeScreenChanger } from "../widgets/swipe-screen-changer";
import { MyLoader } from "../widgets/loader";
import { useDispatch, useSelector } from "react-redux";
import { _getProfileById, _getProfiles } from "../_temp/users";
import { rSnackbarAction, SnackbarStyle } from "../redux/slice-snackbar";

interface FeedProfileProps extends PropsWithReduxProfile, FeedRootProps { }

export function FeedProfile(props: FeedRootProps) {
  const defaultLimit = 4;
  const defaultSort = 'name';
  const defaultOrder = -1;
  
  const dispatch = useDispatch();
  const profileStore = useSelector((state: RootState) => state.profile);

  const filterProfiles = () => {
    if(profileStore.data?.length > 1) {
      const sort = profileStore.filter?.sort || defaultSort;
      const order = profileStore.filter?.order || defaultOrder;

      let result = Array.from(profileStore.data);
      result = result.sort((a: any, b: any) => {
        if (a[sort] instanceof Date) {
          return (a[sort].getTime() - b[sort].getTime()) * order;
        } else if (typeof a[sort] === 'number') {
          return (a[sort] - b[sort]) * order;
        } else if (typeof a[sort] === 'string') {
          return a[sort].toUpperCase().localeCompare(b[sort].toUpperCase()) * order;
        } else {
          return 1;
        }
      });
  
      result = result.slice(0, profileStore.filter?.count || 10000);
      return result;  
    } else {
      return profileStore.data;
    }
  }

  let profiles = filterProfiles();
  let [state, setState] = useState<{fetching: boolean}>({fetching: false});

  const fetchHandler = async (query: GetQuery = {}) => {
    if(!query.limit) {
      query.limit = defaultLimit;
    }

    if(!query.sort) {
      query.sort = defaultSort;
    }

    if(query.order !== -1 && query.order !== 1) {
      query.order = defaultOrder;
    }

    if(!query.skip) {
      query.skip = profiles.length;
    }

    try {      
      dispatch(rProfileAction.updateFilter({
        count: query.limit + (query.skip || 0),
        sort: profileStore.filter?.sort || query.sort,
        order: profileStore.filter?.order || query.order,
      }));

      setState({...state, fetching: true});
      const data = await _getProfiles(query);
      dispatch(rProfileAction.add({ data: data, markAsInitialized: true }));
      setState({...state, fetching: false})
    } catch (error) {
      setState({...state, fetching: false});
      dispatch(rSnackbarAction.show({ message: error as string, style: SnackbarStyle.error }));
    }
  }

  useEffect(() => {
    if(!profileStore.initialized) {
      fetchHandler({ sort: defaultSort, order: defaultOrder, limit: defaultLimit });
    }
  }, []);

  return (
    <SwipeScreenChanger
      allowAxis='x'
      onAxisLocked={() => { }}
      onSwipeDetected={props.changePage}
      direction={props.direction}
    >
      <div style={{ minHeight: '100%', touchAction: 'pan-y' }} >
        <div className="mt-45p mt-md-60p mb-80p mb-md-100p">
          {
            profileStore.initialized && profiles?.length == 0 ?
              <div
                className="pt-25p"
                style={{ margin: 'auto', width: 'calc(100% - 30px)', maxWidth: '400px' }}
              >
                <div className="rounded-12p overflow-hidden">
                  <AspectRatio ratio={3 / 2}>
                    <FittedBox.Img
                      image={"/assets/no-content.png"}
                      style={{ objectFit: 'cover', position: 'absolute' }}
                    />
                  </AspectRatio>

                </div>
                <h6 className="text-center mt-15p">No content!</h6>
              </div> : null
          }
          {
            profiles.length > 0 ?
              <>
                <ProfilesUI profiles={profiles} />
                <div className="text-center">
                  <button 
                  className="btn-primary"
                  onClick={() => { fetchHandler()}}
                  >More</button>
                </div>
              </>
               : null
          }
          {
            state.fetching ?
            <MyLoader></MyLoader> : null
          }
        </div>
      </div>
    </SwipeScreenChanger>
  );
}

function ProfilesUI(props: { profiles: any[] }) {
  console.log('profileUI');
  const location = useLocation();
  const navigate = useNavigate();

  return (
    props.profiles.length === 0 ?
      <div
        className="pt-25p"
        style={{ margin: 'auto', width: 'calc(100% - 30px)', maxWidth: '400px' }}
      >
        <div className="rounded-12p overflow-hidden">
          <AspectRatio ratio={3 / 2}>
            <FittedBox.Img
              image={"/assets/no-content.png"}
              style={{ objectFit: 'cover', position: 'absolute' }}
            />
          </AspectRatio>

        </div>
        <h6 className="text-center mt-15p">No content!</h6>
      </div>
      :

      <div className="d-flex main-axis-between mx-10p" style={{ flexWrap: 'wrap' }}>
        {
          props.profiles.map((profile: any) => {
            return (
              <div
                key={profile.id}
                className="main-axis-item-2 main-axis-item-md-3 mb-15p mb-md-20p"
                onClick={() => {
                  navigate(`/user/${profile.id}`, { state: { background: location } })
                }}
              >
                <Card.UserItem data={profile}></Card.UserItem>
              </div>
            );
          })
        }
      </div>
  );
}