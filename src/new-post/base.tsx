import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { RouteItem } from "../definition/routes";
import { EventEditor } from "./event";
import { PostEditor } from "./post";

const routes: RouteItem[] = [
  {path: 'post', element: <PostEditor />},
  {path: 'event', element: <EventEditor />},
]

export class Editor extends Component {
  render() {
    return (
      <div className="p-15p">
        <Routes>
          {routes.map(route => <Route key={route.path} path={route.path} element={route.element}></Route>)}
        </Routes>
      </div>
    );
  }
}