import { createElement, useEffect } from 'react';
import './scss/App.scss';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Feed } from './feed/base';
import { Explore } from './pages/explore';
import { RouteItem } from './definition/routes';
import { AppBarBottom } from './app-bar-bottom';
import { PropsWithReduxSetting, settingConnector } from './redux/store';
import { authenticate } from './redux/slice-auth';
import { Login } from './auth/login';
import { Snackbar } from './widgets/snackbar';
import { MyProfile } from './dashboard/my-profile';
import { Editor } from './editor/base';
import { Message } from './message/base';
import { ChildViewOverlay } from './widgets/child-view-overlay';


const routes: RouteItem[] = [
  { path: '/*', element: <Feed /> },
  { path: '/explore/*', element: <Explore /> },
  // { path: '/new/*', element: <Editor /> },
  { path: '/message/*', element: <Message /> },
  { path: '/login/*', element: <Login /> },
  { path: '/my-profile', element: <MyProfile /> },
  { path: '/', element: <Navigate to='/recommend' /> }
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
      <div
        className={`app-container ${props.setting.appearance}`}
        style={{ height: window.innerHeight + 'px' }}
      >
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

        <div className="bottom-bar">
          <AppBarBottom />
        </div>

        <Routes>
          <Route path="/new/*" element={<ChildViewOverlay><Editor></Editor></ChildViewOverlay>}></Route>
        </Routes>
      </div>
      <Snackbar />
    </>
  );
}

