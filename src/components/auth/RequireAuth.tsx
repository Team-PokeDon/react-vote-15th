import { Navigate, Outlet, useLocation } from 'react-router-dom';
import UnauthorizedPage from '../../pages/UnauthorizedPage';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/auth/authSlice';

// provide protected routes
function RequireAuth({ allowedPart }: any) {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  // console.log(location);
  // console.log(user.part);
  if (user.part === 'FE' || user.part === 'BE') {
    if (user.part === allowedPart) {
      return <Outlet />;
    } else {
      // 파트에 따라 권한없음 표시!
      return <UnauthorizedPage />;
    }
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default RequireAuth;
