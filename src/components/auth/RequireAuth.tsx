import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import UnauthorizedPage from '../../pages/UnauthorizedPage';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/auth/authSlice';
import jwt_decode from 'jwt-decode';

function RequireAuth() {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const { part } = useParams();

  // TODO: 백엔드와 토큰 사용 협의
  // const decoded = user?.token.accessToken
  //   ? jwt_decode(user.token.accessToken)
  //   : undefined;
  // const part = decoded?.UserInfo?.part || '';

  if (user.part === 'FE' || user.part === 'BE') {
    if (user.part === part) {
      return <Outlet />;
    } else {
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
