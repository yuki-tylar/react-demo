import { Profiles } from "../profiles/profiles";
import { SwipeScreenChanger } from "../widgets/swipe-screen-changer";
import { FeedRootProps } from "./base";

export function FeedProfile(props: FeedRootProps) {
  return (
    <SwipeScreenChanger
      allowAxis='x'
      onSwipeDetected={props.changePage}
      direction={props.direction}
    >
      <Profiles />
    </SwipeScreenChanger>
  );
}