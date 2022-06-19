import { Navigate, Outlet, useLocation } from 'react-router-dom';
import UnauthorizedPage from '../../pages/UnauthorizedPage';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/auth/authSlice';

function RequireAuth({ allowedPart }: any) {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  if (user.part === 'FE' || user.part === 'BE') {
    if (user.part === allowedPart) {
      return <Outlet />;
    } else {
      return <UnauthorizedPage />;
    }
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // 내가 가려고 했던곳도 기억하고 있어야된다.
  // return  (
  //   user?.part? === allowedPart
  //   <Navigate to="/login" state={{ from: location }} replace />
  // ) : (
  //   <Outlet />
  // );
}

export default RequireAuth;
