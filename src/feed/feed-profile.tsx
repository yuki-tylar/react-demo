import { createElement, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { fetchProfiles, rProfileAction } from "../redux/slice-profiles";
import { profileConnector, PropsWithReduxProfile } from "../redux/store";
import { AspectRatio, FittedBox } from "../widgets/box";
import { Card } from "../widgets/card";
import { FeedRootProps } from "./base";
import { SwipeScreenChanger } from "../widgets/swipe-screen-changer";
import { MyLoader } from "../widgets/loader";

interface FeedProfileProps extends PropsWithReduxProfile, FeedRootProps { }

export function FeedProfile(props: FeedRootProps) {
  return createElement(profileConnector(_FeedProfile), props);
}

function _FeedProfile(props: FeedProfileProps) {
  let loading: boolean = props.profile.loading;
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (!loading && !props.profile.initialized) {
      fetchProfiles(props.dispatch, { sort: 'name', order: -1, skip: 0, limit: 8 })
    }
  })

  return (
    <>
      <SwipeScreenChanger
        allowAxis='x'
        onAxisLocked={() => { }}
        onSwipeDetected={props.changePage}
        direction={props.direction}
      >
        <div style={{ minHeight: '100%', touchAction: 'pan-y' }} >
          {
            <div className="mt-45p mt-md-60p mb-80p mb-md-100p">
              {
                loading ? 
                  <MyLoader></MyLoader> :
                  props.profile.data.length === 0 ?
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
                        props.profile.data.map((profile: any) => {
                          return (
                            <div
                              key={profile.id}
                              className="main-axis-item-2 main-axis-item-md-3 mb-15p mb-md-20p"
                              onClick={() => {
                                props.dispatch(rProfileAction.select({ data: profile }))
                                navigate('user', { state: { background: location } })
                              }}
                            >
                              <Card.UserItem data={profile}></Card.UserItem>
                            </div>
                          );
                        })
                      }
                    </div>
              }
            </div>
          }
        </div>
      </SwipeScreenChanger>

    </>

  );
}