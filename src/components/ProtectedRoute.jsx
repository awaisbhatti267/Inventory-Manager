import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const userId = localStorage.getItem('userId');

  return userId ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;