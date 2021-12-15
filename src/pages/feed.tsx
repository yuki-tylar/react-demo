import { createElement, useRef, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import { FeedRecommend } from "./feed-recommend";
import { FeedEvent } from "./feed-event";

const routes = [
  { path: 'recommend', component: FeedRecommend, data: { title: 'Recommends' } },
  { path: 'event', component: FeedEvent, data: { title: 'Events' } },
];

const variantsRouter = {
  enter: (data: {direction: number, width: number}) => {
    return {
      x: data.direction > 0 ? data.width : -data.width ,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (data: {direction: number, width: number}) => {
    return {
      x: data.direction > 0 ? -data.width : data.width,
      opacity: 1,
      zIndex: 0,
    }
  },
}

const swipeConfidenceThreshold = 1000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

function FeedAnimator(props: { component: any, direction: number, changePage: (direction: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  let direction = 'x';

  return (
    <motion.div
      ref ={ref}
      style={{ height: '100%' }}
      custom={{direction: props.direction, width: (ref.current?.clientWidth || 1000)}}
      variants={variantsRouter}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }}
      drag={'x'}
      dragConstraints={{ left: 0, right: 0, bottom: 0 }}
      dragElastic={1}
      dragDirectionLock
      onDirectionLock={d => direction = d }
      onDragEnd={(e, { offset, velocity }) => {
        if(direction == 'x') {
          const swipe = swipePower(offset.x, velocity.x);
          if (swipe < -swipeConfidenceThreshold) {
            console.log('changePage');
            props.changePage(1);
          } else if (swipe > swipeConfidenceThreshold) {
            console.log('changePage');
            props.changePage(-1);
          }  
        }
      }}
    >
      {createElement(props.component)}
    </motion.div>

  )
}

export function FeedBase() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialPage = routes.findIndex(route => location.pathname === ('/' + route.path));
  const [state, setState] = useState({ direction: 0, page: initialPage || 0 });

  const changePage = (direction: number) => {
    const nextPage = (state.page + direction + routes.length) % routes.length;
    setState({ direction: direction, page: nextPage });
    navigate(routes[nextPage].path);
  }

  return (
    <>
      <div className="app-body">
        <div className="app-bar d-flex main-axis-center">
          <h2 className="headline4 headline3-md" onClick={() => { changePage(1) }}>
            {routes[state.page].data.title}
          </h2>
        </div>
        <AnimatePresence initial={false} exitBeforeEnter>
          <Routes location={location} key={location.pathname}>
            {routes.map(route =>
              <Route
                key={route.path}
                path={route.path}
                element={<FeedAnimator component={route.component} direction={state.direction} changePage={changePage}></FeedAnimator>}
              ></Route>
            )}
          </Routes>
        </AnimatePresence>
      </div>

      <div className="bottom-bar">
        <div className="bottom-bar-inner">

        </div>
      </div>
    </>
  );
}