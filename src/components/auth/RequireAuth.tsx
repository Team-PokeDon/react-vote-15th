import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import UnauthorizedPage from '../../pages/UnauthorizedPage';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/slices/authSlice';
import jwt_decode from 'jwt-decode';
import useDecodeAccessToken from '../../lib/hooks/api/useDecodeAccessToken';

function RequireAuth() {
  const location = useLocation();
  const { partParam } = useParams();
  const user = useAppSelector(selectUser);

  const initUser = { user_id: null, part: '', name: '' };

  const { part } = user.accessToken
    ? useDecodeAccessToken(user.accessToken)
    : initUser;

  if (user.accessToken === '') {
    if (confirm('로그인이 필요한 페이지입니다. 로그인하시겠습니까?')) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  } else {
    if (partParam === 'FE' || partParam === 'BE') {
      if (part !== partParam) {
        return <UnauthorizedPage />;
      }
    }
  }
  return <Outlet />;
}

export default RequireAuth;
