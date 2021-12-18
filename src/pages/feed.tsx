import { createElement, useRef, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import { FeedRecommend } from "./feed-recommend";
import { FeedEvent } from "./feed-event";
import { gestureService } from "../service/gesture-service";
import { FeedProfile } from "./feed-profile";

interface RouteDataItem {
  id: string;
  path: string;
  component: (props: FeedRootProps) => JSX.Element;
  data: { [k: string]: any };
}

interface FeedBaseProps {
  direction: number;
  page: number;
  directionLocked: 'x' | 'y' | null;
}

export interface FeedRootProps {
  scrollable: boolean;
}

const routes: RouteDataItem[] = [
  { id: 'recommend', path: 'recommend/*', component: FeedRecommend, data: { title: 'Recommends', darkmode: true } },
  { id: 'event', path: 'event/*', component: FeedEvent, data: { title: 'Events' } },
  { id: 'profile', path: 'profile/*', component: FeedProfile, data: {title: 'People'} },
];


const variantsRouter = {
  enter: (data: { direction: number, width: number }) => {
    return {
      x: data.direction > 0 ? data.width : -data.width,
      opacity: 0,
    }
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (data: { direction: number, width: number }) => {
    console.log(data.direction);
    return {
      x: data.direction > 0 ? -data.width : data.width,
      opacity: 1,
    }
  },
}


export function FeedBase() {
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  const initialPage = routes.findIndex(route => location.pathname.match(new RegExp('^/' + route.id)));
  const [state, setState] = useState<FeedBaseProps>({
    direction: 0,
    page: initialPage || 0,
    directionLocked: null,
  });

  const changePage = (direction: number) => {
    const nextPage = (state.page + direction + routes.length) % routes.length;
    setState({ ...state, direction: direction, page: nextPage, directionLocked: null });
    navigate(routes[nextPage].id)
  }

  const currentRoute = routes[state.page];

  const path = location.pathname.replace(/^\/|\/$/g, '').split('/');
  const onRoot = !!path[0].match(currentRoute.id) && path.length === 1;

  const title = currentRoute.data.title;
  const darkmode = currentRoute.data.darkmode;

  return (
    <>
      {/* routes for root */}
      <motion.div
        ref={ref}
        className="app-body-feed"
        initial={false}
        animate={darkmode ? 'dark' : 'light'}
        variants={{
          dark: {backgroundColor: '#04122D'},
          light: {backgroundColor: '#EFF3F7'}
        }}

      >
        <motion.div
          className="app-bar-feed d-flex main-axis-center"
          animate={onRoot ? 'shown' : 'hidden'}
          variants={{
            shown: { transform: 'translateY(0%)'},
            hidden: { transform: 'translateY(-100%)'}
          }}
        >
          <h2
            className={'headline4 headline3-md' + (darkmode ? ' text-white' : ' text-body')}
            onClick={() => { changePage(1) }}
          >
            {title}
          </h2>
        </motion.div>
        <AnimatePresence initial={false} exitBeforeEnter>
          <Routes location={location} key={routes[state.page].id}>
            {routes.map(route =>
              <Route
                key={route.id}
                path={route.path}
                element={
                  <motion.div
                    className="pos-relative"
                    custom={{ direction: state.direction, width: (ref.current?.clientWidth || 1000) }}
                    variants={variantsRouter}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    drag={onRoot ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0, bottom: 0, top: 0 }}
                    dragElastic={1}
                    dragDirectionLock
                    onDirectionLock={d => {
                      if (state.directionLocked !== d) {
                        setState({ ...state, directionLocked: d });
                      }
                    }}
                    onDrag={(e, info) => {
                      const direction = info.delta.x > 0 ? -1 : info.delta.x < 0 ? 1 : 0;
                      if (direction !== 0 && state.direction != direction) {
                        setState({ ...state, direction });
                      }
                    }}
                    onDragEnd={(e, { offset, velocity }) => {
                      if (state.directionLocked === 'x') {
                        const direction = gestureService.getSwipeDirection(offset.x, velocity.x);
                        if (direction !== 0) {
                          changePage(direction);
                        }
                      }
                    }}
                  >
                    {createElement(
                      route.component,
                      { scrollable: state.directionLocked === 'y' && onRoot }
                    )}
                  </motion.div>
                }
              />
            )}
          </Routes>
        </AnimatePresence>
      </motion.div>

      <div className="bottom-bar">
        <div className="bottom-bar-inner">

        </div>
      </div>
    </>
  );
}