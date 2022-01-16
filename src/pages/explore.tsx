import { motion } from "framer-motion";
import { Component, createElement, PropsWithChildren } from "react";
import { TabBar } from "../feed/tab-bar";
import { TabView } from "../widgets/tab-view/tab-view";

export function Explore(props: PropsWithChildren<{}>) {

  return (
    <TabView
      responsive={true}
      classNameBody='bg-background pb-0p'
      classNameTabBar='bg-white text-body border-line'
      tabBar={createElement(TabBar)}
    >
      <div className="p-15p">
        <h2>Messages</h2>
        <p>Not implemented yet</p>
      </div>
    </TabView>
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