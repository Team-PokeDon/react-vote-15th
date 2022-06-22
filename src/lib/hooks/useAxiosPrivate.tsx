import { useEffect } from 'react';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/auth/authSlice';
import { axiosPrivate } from '../api/axios';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // initial request: 첫번째 시도 or 새로고침 시 authorization header가 설정되어 있지 않기 때문에 설정해준다.
        // @ts-expect-error
        if (!config.headers['Authorization']) {
          // @ts-expect-error
          config.headers['Authorization'] = `Bearer ${user.token.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      // response is good
      (response) => response,
      // response is bad due to 토큰 만료
      async (error) => {
        const prevRequest = error?.config;
        // expire access token == 401 error
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh(); // 토큰 갱신
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          // request again
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      // interceptors 제거
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [user, refresh]);
  // interceptor를 포함한 인스턴스를 반환한다.
  return axiosPrivate;
};

export default useAxiosPrivate;
