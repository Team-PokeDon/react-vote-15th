import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { refreshAccessToken, selectUser } from '../../store/auth/authSlice';
import axios from '../api/axios';

const useRefreshToken = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  console.log(`before ${user.token.accessToken}`);
  const refresh = async () => {
    const response = await axios.post(
      '/refreshes/',
      {},
      {
        headers: { 'Refresh-Authorization': `${user.token.refreshToken}` },
      },
    );
    console.log(response?.data?.detail);
    // // overwrite with a new access token, prev state from the server
    dispatch(refreshAccessToken(response?.data?.detail));
    // console.log(`after ${user.token.accessToken}`);
    // return the new access token
    return response.data.detail.access_token;
  };
  // access token을 refresh 하는 함수를 반환한다.
  return refresh;
};

export default useRefreshToken;
