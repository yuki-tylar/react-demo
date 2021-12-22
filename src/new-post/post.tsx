import { useNavigate } from "react-router-dom";
import { CanActivateIfLoggedIn } from "../guards/can-activate-if-logged-in";

export function PostEditor() {
  const navigate = useNavigate();

  return (
    <CanActivateIfLoggedIn onGuard={() => { navigate('/login') }}>
      <h3>What is in your mind?</h3>
      <p>Not implemented yet</p>
    </CanActivateIfLoggedIn>
  );

}