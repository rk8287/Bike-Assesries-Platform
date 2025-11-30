import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PreventAuthRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

export default PreventAuthRoute;
