import { useAppDispatch } from '../../store/app/hooks';
import { setUser } from '../../store/auth/authSlice';
import axios from '../api/axios';

const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const refresh = async () => {
    const response = await axios.get('/refresh', {
      withCredentials: true,
    });
    // overwrite with a new access token, prev state from the server
    dispatch(setUser(response?.data?.detail));
    // return the new access token
    return response.data.token.access_token;
  };
  // access token을 refresh 하는 함수를 반환한다.
  return refresh;
};

export default useRefreshToken;
