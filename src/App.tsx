import { Component } from 'react';
import './scss/App.scss';
import { Route, BrowserRouter, Routes, Navigate, Link } from 'react-router-dom';
import { Feed } from './feed/base';
import { Explore } from './pages/explore';
import { RouteItem } from './definition/routes';
import { AppBarBottom } from './app-bar-bottom';

const routes: RouteItem[] = [
  { path: '/*', element: <Feed /> },
  { path: '/explore/*', element: <Explore /> },
  { path: '/message/*', element: <Explore /> },
  { path: '/auth/*', element: <Explore /> },
  { path: '/', element: <Navigate to='/recommend' /> }
];

export default class App extends Component {
  render() {
    return (
      <div className='app-container'>
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
            <AppBarBottom/>
          </div>

        </BrowserRouter >

      </div >
    );
  }
};

