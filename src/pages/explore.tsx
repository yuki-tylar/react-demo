import { motion } from "framer-motion";
import { Component, PropsWithChildren } from "react";

export function Explore(props: PropsWithChildren<{}>) {

  return (
    <div className="p-15p">
      <h2>Explore</h2>
      <p>Not implemented yet</p>
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