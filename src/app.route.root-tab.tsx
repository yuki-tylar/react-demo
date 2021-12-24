import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Login } from "./auth/login";
import { MyProfile } from "./dashboard/my-profile";
import { RouteItem } from "./definition/routes";
import { Feed } from "./feed/base";
import { Message } from "./message/base";
import { Explore } from "./pages/explore";

const routes: RouteItem[] = [
  { path: '/*', element: <Feed /> },
  { path: '/explore/*', element: <Explore /> },
  { path: '/message/*', element: <Message /> },
  { path: '/login/*', element: <Login /> },
  { path: '/my-profile', element: <MyProfile /> },
  { path: '/', element: <Navigate to='/recommend' /> }
];


export function AppRouteRootTab() {
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