import { createElement, useEffect } from 'react';
import './scss/App.scss';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Feed } from './feed/base';
import { Explore } from './pages/explore';
import { RouteItem } from './definition/routes';
import { PropsWithReduxSetting, settingConnector } from './redux/store';
import { authenticate } from './redux/slice-auth';
import { Login } from './auth/login';
import { Snackbar } from './widgets/snackbar';
import { MyProfile } from './dashboard/my-profile';
import { Editor } from './editor/base';
import { Message } from './message/base';
import { ChildViewOverlay } from './widgets/child-view-overlay';
import { Profile } from './user-detail/profile';
import { AnimatePresence } from 'framer-motion';
import { ChildView } from './widgets/child-view-container';


const routes: RouteItem[] = [
  { path: '/explore/*', element: <Feed /> },
  { path: '/search/*', element: <Explore /> },
  // { path: '/new/*', element: <Editor /> },
  { path: '/message/*', element: <Message /> },
  { path: '/login/*', element: <Login /> },
  { path: '/my-profile', element: <MyProfile /> },
  { path: '/', element: <Navigate to='/explore/recommend' /> }
];

export default function App() {
  return createElement(settingConnector(_App));
};

function _App(props: PropsWithReduxSetting) {
  const location = useLocation();
  const background = location.state && (location.state as { background: any }).background;

  useEffect(() => {
    if (props.auth.status === 'notChecked') {
      authenticate(props.dispatch);
    }
  })

  return (
    <>
      <Routes location={background || location}>
        {
          routes.map(route =>
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          )
        }
      </Routes>

      <AnimatePresence>
        {
          background ?
            <Routes location={location} key={location.pathname}>
              <Route path="/new/*" element={<ChildViewOverlay><Editor></Editor></ChildViewOverlay>}></Route>
              <Route path="user/:id" element={<ChildView><Profile/></ChildView>}></Route>
            </Routes> : null
        }
      </AnimatePresence>

      <Snackbar />
    </>
  );
}

