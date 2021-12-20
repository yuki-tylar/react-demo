import {RouteFeedItem, RouteItem } from './definition/routes';
import { FeedBase } from './pages/feed';
import { FeedEvent } from './pages/feed-event';
import { FeedProfile } from './pages/feed-profile';
import { FeedRecommend } from './pages/feed-recommend';

const routesFeed: RouteFeedItem[] = [
  { path: 'recommend', component: FeedRecommend, data: {title: 'Recommends', darkmode: true}, children: [
    { path: 'user', }
  ] },
  // { path: 'event', component: FeedEvent, data: {title: 'Events'} },
  // { path: 'profile', component: FeedProfile, data: {title: 'Profiles'} },
]

export const routes: RouteItem[] = [
  { path: '/', element: <FeedBase />, children: routesFeed },
]

