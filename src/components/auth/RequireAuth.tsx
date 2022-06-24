import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import UnauthorizedPage from '../../pages/UnauthorizedPage';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/slices/authSlice';
import jwt_decode from 'jwt-decode';

function RequireAuth() {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const { paramPart } = useParams();

  // decode access token
  const decoded: any = user?.accessToken
    ? jwt_decode(user.accessToken)
    : undefined;
  // TODO: access token 형식 확인
  const userPart = decoded?.UserInfo?.part || '';

  if (userPart === 'FE' || userPart === 'BE') {
    if (userPart === paramPart) {
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
