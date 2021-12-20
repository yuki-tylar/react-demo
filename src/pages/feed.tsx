import { createElement, useRef, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import { FeedRecommend } from "./feed-recommend";
import { FeedEvent } from "./feed-event";
import { FeedProfile } from "./feed-profile";
import { ChildView } from "../widgets/child-view-container";
import { User } from "../widgets/user-detail-inner";
import { RouteFeedItem } from "../definition/routes";
import { Axis, Direction } from "../definition/general";


interface FeedBaseProps {
  direction: Direction;
  page: number;
}

export interface FeedRootProps {
  direction: Direction;
  changePage: (direction: Direction) => void;
}

const routes: RouteFeedItem[] = [
  { path: 'recommend', component: FeedRecommend, data: { title: 'Recommends', darkmode: true } },
  { path: 'event', component: FeedEvent, data: { title: 'Events' } },
  { path: 'profile', component: FeedProfile, data: { title: 'People' } },
];

export function FeedBase() {
  const location = useLocation();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  const initialPage = routes.findIndex(route => location.pathname.match(new RegExp('^/' + route.path)));
  const [state, setState] = useState<FeedBaseProps>({
    direction: 0,
    page: initialPage || 0,
  });

  const changePage = (direction: Direction) => {
    const nextPage = (state.page + direction + routes.length) % routes.length;
    setState({ ...state, direction: direction, page: nextPage });
    navigate(routes[nextPage].path)
  }

  const currentRoute = routes[state.page];

  const path = location.pathname.replace(/^\/|\/$/g, '').split('/');
  const onRoot = !!path[0].match(currentRoute.path) && path.length === 1;

  if(!onRoot && state.direction !== 0) {
    setState({...state, direction: 0})
  }

  const title = currentRoute.data.title;
  const darkmode = currentRoute.data.darkmode;

  return (
    <>
      <motion.div
        className="app-bar-feed d-flex main-axis-center"
        animate={onRoot ? 'shown' : 'hidden'}
        variants={{
          shown: { transform: 'translateY(0%)' },
          hidden: { transform: 'translateY(-100%)' }
        }}
      >
        <h2
          className={'headline4 headline3-md' + (darkmode ? ' text-white' : ' text-body')}
          onClick={() => { changePage(1) }}
        >
          {title}, {currentRoute.path}
        </h2>
      </motion.div>

      {/* routes for root */}
      <motion.div
        ref={ref}
        className="app-body-feed"
        initial={false}
        animate={darkmode ? 'dark' : 'light'}
        variants={{
          dark: { backgroundColor: '#04122D' },
          light: { backgroundColor: '#EFF3F7' }
        }}
      >
        <AnimatePresence initial={false} exitBeforeEnter>
          <Routes location={location} key={currentRoute.path}>
            {routes.map(route =>
              <Route
                key={`${route.path}`}
                path={`${route.path}/*`}
                element={createElement(route.component, { changePage: changePage, direction: state.direction })}
              />
            )}
          </Routes>
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route key={`${location.pathname}-user`} path={`/:feedtype/user`} element={
            <ChildView>
              <User></User>
            </ChildView>
          } />
        </Routes>
      </AnimatePresence>
    </>
  );
}