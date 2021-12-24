import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { RouteItem } from "../definition/routes";
import { CanActivateIfLoggedIn } from "../guards/can-activate-if-logged-in";
import { EventEditor } from "./event";
import { PostEditor } from "./post";

const routes: RouteItem[] = [
  { path: 'post', element: <PostEditor /> },
  { path: 'event', element: <EventEditor /> },
  { path: '/', element: <Navigate to="post" /> }
]

export function Editor() {
  const navigate = useNavigate();
  return (
    <CanActivateIfLoggedIn onGuard={() => { navigate('/login', { replace: true }) }}>
      <Routes>
        {
          routes.map(route =>
            <Route key={route.path} path={route.path} element={route.element}></Route>
          )
        }
      </Routes>
    </CanActivateIfLoggedIn>
  );
}
