import { createElement } from "react";
import { profileConnector, PropsWithReduxProfile } from "../redux/store";
import { Card } from "../widgets/card";
import { users } from "../_temp/users";
import { FeedRootProps } from "./feed";

interface FeedProfileProps extends PropsWithReduxProfile, FeedRootProps {}

export function FeedProfile(props: FeedRootProps) {
  return createElement(profileConnector(_FeedProfile), props);
}

function _FeedProfile(props: FeedProfileProps) {
  let profiles = [];
  if(props.profile.initialized) {
  }
  return (
    <div
      className="bg-background"
      style={{ touchAction: 'pan-y' }}
    >
      <div className="mt-45p mt-md-60p mb-80p mb-md-100p">
        <div className="d-flex main-axis-between mx-10p" style={{flexWrap: 'wrap'}}>
          {
            users.map((user: any) => {
              return (
                <div key={user.id} className="mb-10p main-axis-item-2 main-axis-item-md-3">
                  <Card.UserItem data={user}></Card.UserItem>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}