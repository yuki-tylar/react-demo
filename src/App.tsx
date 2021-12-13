import { BaseSyntheticEvent, Component, SyntheticEvent, TouchEvent, useState } from 'react';
import './scss/App.scss';
import { Link, Route, BrowserRouter, Routes } from 'react-router-dom';
import { motion } from 'framer-motion'
import FeedBase from './pages/feed';

class PageA extends Component {
  ontouchstart(e: TouchEvent) {
    console.log(e.touches);
  }

  render() {
    const styles = {width: '100px', height: '100px', background: 'orange'} as React.CSSProperties;
    return (
      <div>
        <h2 onTouchStart={this.ontouchstart}>PAGE A</h2>
        <Link to="ab">go to AB</Link>
        <Routes>
          <Route path="ab" element={<PageAB />} />
        </Routes>

        <motion.div 
        style={styles} 
        animate={{
          x: 20,
          opacity: 1
        }}
        initial={{
          x: 20,
          opacity: 1
        }}
        // exit={{
        //   x: -100,
        //   opacity: 0
        // }}
        // transition={{
        //   duration: 0.2
        // }}
        />
      </div>
    );
  }
}

class PageAB extends Component {
  private style = {
    position: 'fixed', width: '100%', height: '100%', background: 'white', top: '0', left: '0'
  } as React.CSSProperties;

  render() {
    return (
      <div style={this.style}>
        <h2>PAGE AB</h2>
      </div>
      
    );
  }
}

export default class App extends Component {
  render() {
    return(
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/*' element={<FeedBase />} />
            <Route path='/explore/*' />
            <Route path='/messages/*' />
            <Route path='/auth/*' />
          </Routes>

        </BrowserRouter>
      </div>
    );
  }
};

