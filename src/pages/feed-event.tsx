
import { createElement, useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { fetchEvents } from "../redux/slice-events";
import { eventConnector, PropsWithReduxEvent } from "../redux/store";
import { AspectRatio, FittedBox } from "../widgets/box";
import { Card } from "../widgets/card";
import { FeedRootProps } from "./feed";
import { SwipeScreenChanger } from "./feed/swipe-detector";

interface FeedEventProps extends PropsWithReduxEvent, FeedRootProps { }

export function FeedEvent(props: any) {
  return createElement(eventConnector(_FeedEvent), props);
}

function _FeedEvent(props: FeedEventProps) {
  let loading: boolean = props.event.loading;

  useEffect(() => {
    if (!loading && !props.event.initialized) {
      fetchEvents(props.dispatch, { sort: 'date', order: 1, skip: 0, limit: 3 });
    }
  });

  return (
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
                <div className="text-center subtitle1 pt-25p">
                  <ScaleLoader color='#838790'></ScaleLoader>
                </div> :

                props.event.data.length === 0 ?
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

                  props.event.data.map((event: any) => {
                    return (
                      <div key={event.id} className="mb-15p mb-md-25p">
                        <Card.EventItem data={event}></Card.EventItem>
                      </div>
                    );
                  })
            }
          </div>
        }
      </div>
    </SwipeScreenChanger>
  );
}
