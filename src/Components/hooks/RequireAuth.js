import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = ({ allowedRole }) => {
  const location = useLocation();
  const auth = useSelector(({ login }) => login.userCredentials);

  if (allowedRole === 'user') {
    return localStorage.getItem('userCredentials') ? (
      <Outlet />
    ) : (
      <Navigate to='/login' state={{ from: location }} replace />
    );
  }

  if (allowedRole === 'root') {
    return JSON.parse(localStorage.getItem('userCredentials'))?.root ? (
      <Outlet />
    ) : JSON.parse(localStorage.getItem('userCredentials')) ? (
      <Navigate to='/404' state={{ from: location }} replace />
    ) : (
      <Navigate to='/login' state={{ from: location }} replace />
    );
  }
};

export default RequireAuth;
