import { createElement } from "react";
import { TabBar } from "../feed/tab-bar";
import { TabView } from "../widgets/tab-view/tab-view";

export function Message() {
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