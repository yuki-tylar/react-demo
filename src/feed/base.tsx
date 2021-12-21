import { createElement, useState } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import { FeedRecommend } from "./feed-recommend";
import { FeedEvent } from "./feed-event";
import { FeedProfile } from "./feed-profile";
import { RouteFeedItem, RouteItemWithComponent } from "../definition/routes";
import { Direction } from "../definition/general";
import { ChildView } from "../widgets/child-view-container";
import { UserDetailInner } from "../widgets/user-detail-inner";


interface State {
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

const routesChild: RouteItemWithComponent[] = [
  { path: ':feedtype/user', component: UserDetailInner, },
]


export function Feed() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialPage = routes.findIndex(route => location.pathname.match(new RegExp('^/' + route.path)));
  const [state, setState] = useState<State>({
    direction: 0,
    page: initialPage || 0,
  });

  const changePage = (direction: Direction) => {
    const nextPage = (state.page + direction + routes.length) % routes.length;
    setState({ ...state, direction: direction, page: nextPage });
    navigate(routes[nextPage].path)
  }

  const currentRoute = routes[state.page > 0 ? state.page : 0];

  const path = location.pathname.replace(/^\/|\/$/g, '').split('/');
  const onRoot = path.length === 1;

  if (!onRoot && state.direction !== 0) {
    setState({ ...state, direction: 0 })
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
          className={'headline4 headline3-md'}
          onClick={() => { changePage(1) }}
        >
          {title}
        </h2>
      </motion.div>

      <div className="app-body-feed">
        <AnimatePresence initial={false} exitBeforeEnter>
          <Routes location={location} key={currentRoute.path}>
            {routes.map(route =>
              <Route
                key={`${route.path}`}
                path={`${route.path}/*`}
                element={createElement(route.component, { changePage: changePage, direction: state.direction })}
              />
            )}
            <Route path="*" element={<Navigate to="recommend"/>} />
          </Routes>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          {
            routesChild.map(route => 
              <Route 
                key={route.path} 
                path={route.path} 
                element={
                  <ChildView>
                    {createElement(route.component)}
                  </ChildView>
                } 
              />
            )
          }
        </Routes>
      </AnimatePresence>
    </>
  );
}