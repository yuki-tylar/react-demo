import { Component } from 'react';
import './scss/App.scss';
import { Route, BrowserRouter, Routes, Navigate, Link } from 'react-router-dom';
import { FeedBase } from './pages/feed';
import { Explore } from './pages/explore';

export default class App extends Component {
  render() {
    return (
      <div className='app-container'>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<FeedBase />} />
            <Route key="explore" path='/explore' element={<Explore />}>
            </Route>
            <Route path='/messages/*' />
            <Route path='/auth/*' />
            <Route path="/" element={<Navigate to="/recommend" />} />
          </Routes>

          <div className="bottom-bar">
            <div className="bottom-bar-inner">
              <Link to="/explore">ex</Link>
              <Link to="/">feed</Link>
            </div>
          </div>

        </BrowserRouter>

      </div>
    );
  }
};

