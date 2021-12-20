import { motion } from "framer-motion";
import { createElement, useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { Axis, Direction } from "../definition/general";
import { fetchContents } from "../redux/slice-contents";
import { rProfileAction } from '../redux/slice-profiles';
import { contentConnector, PropsWithReduxContent } from "../redux/store";
import { gestureService } from "../service/gesture-service";
import { Card } from "../widgets/card";
import { FeedRootProps } from "../feed/base";
import { SwipeScreenChanger } from "./feed/swipe-detector";


interface FeedRecommendProps extends PropsWithReduxContent, FeedRootProps { }

export function FeedRecommend(props: FeedRootProps) {
  return createElement(contentConnector(_FeedRecommend), props);
}
function _FeedRecommend(props: FeedRecommendProps) {
  let [state, setState] = useState({ scrollable: true });

  let loading: boolean = props.content.loading;
  let currentIndex = 0;

  let elScroll: HTMLDivElement | null;

  const checkScrollable = (axis: Axis) => {
    setState({ ...state, scrollable: axis === 'y' })
  }

  useEffect(() => {
    if (!loading && !props.content.initialized) {
      fetchContents(props.dispatch, { sort: 'name', order: -1, skip: 0, limit: 8 })
    }
  });

  const animateTo = (direction: Direction = 0, duration: number = 200) => {
    const el = document.querySelector('.app-body-feed');
    if (el) {
      let indexNext = currentIndex + direction;
      indexNext = indexNext < 0 ? 0 : indexNext > props.content.data.length ? props.content.data.length : indexNext;

      let time = 0;
      const h = el.clientHeight;
      const scrollCurrent = el.scrollTop;
      const scrollNext = h * indexNext;

      while (time <= duration) {
        const scrollTo = scrollCurrent + Math.sin(time / duration * Math.PI / 2) * (scrollNext - scrollCurrent);
        setTimeout(_scrollVerticalTo, time, el, scrollTo);
        time++;
      }

      currentIndex = indexNext;
    }
  }

  return (
    <>
      <SwipeScreenChanger
        allowAxis='x'
        onAxisLocked={checkScrollable}
        onSwipeDetected={props.changePage}
        direction={props.direction}
      >
        <motion.div
          style={{ minHeight: '100%', touchAction: 'none', }}
          onPanStart={() => {
            elScroll = document.querySelector('.app-body-feed');
          }}
          onPan={(e, info) => {
            if (elScroll) {
              elScroll.scrollBy({ top: -info.delta.y });
            }
          }}
          onPanEnd={(e, info) => {
            const direction = gestureService.getSwipeDirection(info.offset.y, info.velocity.y);
            animateTo(direction);
          }}
        >
          {
            loading ?
              <div className="text-center subtitle1 pt-70p">
                <ScaleLoader color='#838790'></ScaleLoader>
              </div> :
              props.content.data.map((content: any,) => {
                return (
                  <Card.FeedItem
                    key={content.id}
                    data={content}
                    selectUser={() => { props.dispatch(rProfileAction.select({ data: content.user })); }}
                  />
                );
              })
          }
        </motion.div>
      </SwipeScreenChanger>
    </>
  )
}

function _scrollVerticalTo(el: HTMLElement, to: number) {
  el.scrollTop = to;
}