import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import UnauthorizedPage from '../../pages/UnauthorizedPage';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/auth/authSlice';

function RequireAuth() {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const { part } = useParams();
  if (user.part === 'FE' || user.part === 'BE') {
    if (user.part === part) {
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
