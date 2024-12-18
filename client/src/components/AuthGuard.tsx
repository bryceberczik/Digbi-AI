import { Navigate } from "react-router-dom";
import auth from "../utils/auth.ts";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
  if (!auth.loggedIn()) {
    return <Navigate to="/signup" replace />;
  }
  return children;
};

export default AuthGuard;
