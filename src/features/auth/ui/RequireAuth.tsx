import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useLoginInfoQuery } from '../hooks/useLoginInfoQuery';

export const RequireAuth = () => {
  const location = useLocation();
  const { data, isLoading, isError } = useLoginInfoQuery();

  if (isLoading) {
    return null;
  }

  const isLoggedIn = Boolean(data?.encSession && data?.user);

  if (isError || !isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (data?.user?.auth_sns !== 'NICE') {
    return <Navigate to="/auth/signup" replace />;
  }

  return <Outlet />;
};
