import { motion } from "framer-motion";
import { createElement, useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { Axis, Direction } from "../definition/general";
import { fetchContents } from "../redux/slice-contents";
import { contentConnector, PropsWithReduxContent } from "../redux/store";
import { gestureService } from "../service/gesture-service";
import { Card } from "../widgets/card";
import { FeedRootProps } from "./base";
import { SwipeScreenChanger } from "../widgets/swipe-screen-changer";
import { useLocation, useNavigate } from "react-router-dom";
import { useContentsDispatchAction, useSelectorContentFilter, useSelectorContentIsInitialized, useSelectorContents } from "../selectors/contents";
import { GetQuery } from "../redux/slice-profiles";
import { useSnackbarDispatchAction } from "../selectors/snackbar";
import { SnackbarStyle } from "../redux/slice-snackbar";
import { MyLoader } from "../widgets/loader";

const defaultLimit = 3;
const defaultOrder = -1;
const defaultSort = 'name';
interface FeedRecommendProps extends FeedRootProps {
  contents: any[];
}

export function FeedRecommend(props: FeedRootProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatcher = useContentsDispatchAction();
  const dispatcherSnackbar = useSnackbarDispatchAction();
  const isInitialized = useSelectorContentIsInitialized();
  const contentsAll = useSelectorContents();
  const filter = useSelectorContentFilter();

  const filterContents = () => {
    if (contentsAll?.length > 1) {
      let result: any[] = Array.from(contentsAll);

      if (filter) {
        result = result.slice(0, filter.count);
      }
      return result;
    } else {
      return contentsAll;
    }
  }

  let contents = filterContents();
  let [fetching, setFetching] = useState<boolean>(false);
  let [scrollable, setScrollable] = useState<boolean>(true);

  let elScroll: HTMLDivElement | null;
  let currentIndex = 0;

  const fetchHandler = async (query: GetQuery = {}) => {
    query = {
      ...query,
      ...!query.limit && { limit: defaultLimit },
      ...!query.skip && { skip: contents.length },
      ...!query.sort && { sort: defaultSort },
      ...(query.order !== -1 && query.order !== 1) && { order: defaultOrder },
    }

    try {
      dispatcher.updateFilter({
        count: query.limit! + (query.skip || 0),
      });

      setFetching(true);
      const data = await fetchContents(query);
      dispatcher.add(data, true);
      setFetching(false);
    } catch (error) {
      setFetching(false);
      dispatcherSnackbar.show({
        message: error as string,
        style: SnackbarStyle.error
      });
    }
  }

  useEffect(() => {
    if (!isInitialized) {
      fetchHandler({ limit: defaultLimit, sort: defaultSort, order: defaultOrder, skip: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkScrollable = (axis: Axis) => {
    if (scrollable != (axis === 'y')) {
      setScrollable(!scrollable);
    }
  }

  const animateTo = (direction: Direction = 0, duration: number = 200) => {
    const el = document.querySelector('.app-body-feed');
    if (el) {
      let indexNext = currentIndex + direction;
      indexNext = indexNext < 0 ? 0 : indexNext > contents.length ? contents.length : indexNext;

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
          fetching ?
            <div className="mt-45p">
              <MyLoader />
            </div> :
            contents.map((content: any,) => {
              return (
                <Card.FeedItem
                  key={content.id}
                  data={content}
                  selectUser={() => {
                    navigate(`/user/${content.user.id}`, { state: { background: location } })
                  }}
                />
              );
            })
        }
      </motion.div>
    </SwipeScreenChanger>
  );
}

function _scrollVerticalTo(el: HTMLElement, to: number) {
  el.scrollTop = to;
}