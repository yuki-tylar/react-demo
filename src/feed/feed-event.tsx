
import { FeedRootProps } from "./base";
import { SwipeScreenChanger } from "../widgets/swipe-screen-changer";
import { Events } from "../events/events";


export function FeedEvent(props: FeedRootProps) {
  return (
    <SwipeScreenChanger
      allowAxis='x'
      onSwipeDetected={props.changePage}
      direction={props.direction}
    >
      <Events />
      
    </SwipeScreenChanger>
  );
}
