import { Component, createElement, useEffect } from 'react';
import './scss/App.scss';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { Feed } from './feed/base';
import { Explore } from './pages/explore';
import { RouteItem } from './definition/routes';
import { AppBarBottom } from './app-bar-bottom';
import { PropsWithReduxSetting, settingConnector } from './redux/store';
import { authenticate } from './redux/slice-auth';
import { Login } from './auth/login';
import { Snackbar } from './widgets/snackbar';

const routes: RouteItem[] = [
  { path: '/*', element: <Feed /> },
  { path: '/explore/*', element: <Explore /> },
  { path: '/message/*', element: <Explore /> },
  { path: '/login/*', element: <Login /> },
  { path: '/', element: <Navigate to='/recommend' /> }
];

export default function App() {
  return createElement(settingConnector(_App));
};

function _App(props: PropsWithReduxSetting) {
  useEffect(() => {
    if(props.auth.status === 'notChecked') {
      authenticate(props.dispatch);
    }
  })
  return (
    <>
      <div 
      className={`app-container ${props.setting.appearance}`}
      style={{height: window.innerHeight + 'px'}}
      >
        <BrowserRouter>
          <Routes>
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

        </BrowserRouter >
      </div>

      <Snackbar />
    </>
  );
}

