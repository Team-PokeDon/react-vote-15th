import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { refreshAccessToken, selectUser } from '../../store/auth/authSlice';
import axios from '../api/axios';

const useRefreshToken = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  // console.log(`before ${user.token.accessToken}`);
  // 리프레시 토큰은 초기화 되어 없어짐
  const refresh = async () => {
    // TODO: refresh token은 header에 담는것이 아닌 쿠키에 담아서 보내야함
    // withCredentials: true로 변경!!
    const response = await axios.post(
      '/refreshes/',
      {},
      {
        headers: { 'Refresh-Authorization': `${user.token.refreshToken}` },
      },
    );
    console.log(response?.data?.detail);
    // overwrite with a new access token, prev state from the server
    // TODO: 리프레시 시 로그인 시와 동일한 정보를 다시 수신하여 protect된 페이지에 접근 (비밀버호는 제외!)
    dispatch(refreshAccessToken(response?.data?.detail));
    console.log(`after ${JSON.stringify(user.token.accessToken)}`);
    // return the new access token
    return response.data.detail.access_token;
  };
  // access token을 refresh 하는 함수를 반환한다.
  return refresh;
};

export default useRefreshToken;
