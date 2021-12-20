import { AnimatePresence, motion } from "framer-motion";
import { Component, PropsWithChildren } from "react";
import { Link, Outlet } from "react-router-dom";

export function Explore(props: PropsWithChildren<{}>) {

  return (
    <div>
      <ul>
        <li>
          <Link to="test">
            <span>Link to explore/test</span>
          </Link>
        </li>
        <li>
          <Link to="">
            <span>Link to explore</span>

          </Link>
        </li>
      </ul>
      <AnimatePresence>
        <div className="Test2">
          <Outlet />
        </div>
      </AnimatePresence>
    </div>
  );
}

const variants = {
  in: {opacity: 1},
  out: {opacity: 0},
}
export class ExploreTest extends Component<PropsWithChildren<{}>> {
  componentWillUnmount() {
    console.log('unmount')
  }
  render() {
    return (
      <motion.div
        key="test5"
        initial='out'
        animate='in'
        exit='out'
        variants={variants}
      >TEST</motion.div>
    )
  }
}