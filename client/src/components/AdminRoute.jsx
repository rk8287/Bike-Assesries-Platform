import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default AdminRoute;