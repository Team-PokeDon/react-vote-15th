import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import UnauthorizedPage from '../../pages/UnauthorizedPage';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/auth/authSlice';

function RequireAuth() {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  console.log('asdf');
  const { part } = useParams();
  if (user.part === 'FE' || user.part === 'BE') {
    if (user.part === part) {
      return <Outlet />;
    } else {
      // 파트에 따라 권한없음 표시!
      return <UnauthorizedPage />;
    }
  } else {
    if (confirm('로그인이 필요한 페이지입니다. 로그인하시겠습니까?')) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
}

export default RequireAuth;
