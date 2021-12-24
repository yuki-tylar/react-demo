import { Route, Routes } from "react-router-dom";
import { RouteItem } from "./definition/routes";
import { Editor } from "./editor/base";

const routes: RouteItem[] = [
  {path: '/new/*', element: <Editor />}
]
export function AppRouteOverlayView() {
  return (
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
  );
}