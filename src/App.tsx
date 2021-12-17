import { Component } from 'react';
import './scss/App.scss';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import { FeedBase } from './pages/feed';

export default class App extends Component {
  render() {
    
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<FeedBase />} />
            <Route path='/explore/*' />
            <Route path='/messages/*' />
            <Route path='/auth/*' />
            <Route path="/" element={<Navigate to="/recommend" />} />

          </Routes>
        </BrowserRouter>
      </>
    );
  }
};

