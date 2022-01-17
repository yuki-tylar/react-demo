import { Component, createElement } from "react";
import { Routes, Route, useLocation, useNavigate, Location, NavigateFunction } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { FeedRecommend } from "./feed-recommend";
import { FeedEvent } from "./feed-event";
import { FeedProfile } from "./feed-profile";
import { RouteFeedItem } from "../definition/routes";
import { Direction } from "../definition/general";
import { TabView } from "../widgets/tab-view/tab-view";
import { TabBar } from "./tab-bar";

export type FeedRootProps = {
  direction: Direction;
  changePage: (direction: Direction) => void;
}

const routes: RouteFeedItem[] = [
  { path: 'recommend', component: FeedRecommend, data: { title: 'Recommends', darkmode: true } },
  { path: 'event', component: FeedEvent, data: { title: 'Events' } },
  { path: 'profile', component: FeedProfile, data: { title: 'People' } },
];

type FeedBaseProps = {
  location: Location;
  navigate: NavigateFunction;
}

export function Feed() {
  return (
    <>
      <FeedRootView location={useLocation()} navigate={useNavigate()} />
      {/* <FeedChildView location={useLocation()} navigate={useNavigate()} /> */}
    </>
  );
}

class FeedRootView extends Component<FeedBaseProps, { direction: Direction }> {
  private currentRouteIndex: number = 0;

  constructor(props: FeedBaseProps) {
    super(props);

    this.state = {
      direction: 0,
    }

    const location = this.getCurrentLocation();
    this.currentRouteIndex = routes.findIndex(route => location.pathname.match(new RegExp('/' + route.path))) || 0;
  }

  getCurrentLocation(): Location {
    const background: Location = this.props.location.state && (this.props.location.state as { background: any }).background;
    return background || this.props.location;
  }

  private changePage = (direction: Direction) => {
    this.setState({ ...this.state, direction: direction });
    this.currentRouteIndex = (this.currentRouteIndex + direction + routes.length) % 3;
    const next = (this.currentRouteIndex + routes.length) % routes.length;
    this.props.navigate(routes[next].path);
  }

  shouldComponentUpdate(nextProps: FeedBaseProps) {
    const nextLocation: Location = (nextProps.location.state && (nextProps.location.state as { background: any }).background) || nextProps.location;
    const currentLocation: Location = (this.props.location.state && (this.props.location.state as { background: any }).background) || this.props.location;
    return nextLocation.pathname !== currentLocation.pathname
  }

  render() {
    const location = this.getCurrentLocation();
    const currentRoute = routes[this.currentRouteIndex];
    const title = currentRoute.data.title;
    const darkmode = !!currentRoute.data.darkmode;

    return (
      <>
        <TabView
          responsive={true}
          classNameBody='bg-background pb-0p'
          classNameTabBar='bg-white text-body border-line'
          tabBar={createElement(TabBar)}
        >

          <div className="app-bar-feed d-flex main-axis-center">
            <h2
              className={`headline4 headline3-md ${darkmode ? ' text-white' : ''}`}
              style={{ transition: 'color 300ms' }}
              onClick={() => { this.changePage(1) }}
            >
              {title}
            </h2>
          </div>

          <div className="app-body-feed">
            <AnimatePresence initial={false} exitBeforeEnter>
              <Routes location={location} key={currentRoute.path}>
                {routes.map(route =>
                  <Route
                    key={`${route.path}`}
                    path={`${route.path}/*`}
                    element={createElement(route.component, { changePage: this.changePage, direction: this.state.direction })}
                  />
                )}
              </Routes>
            </AnimatePresence>
          </div>
        </TabView>
      </>
    );
  }
}