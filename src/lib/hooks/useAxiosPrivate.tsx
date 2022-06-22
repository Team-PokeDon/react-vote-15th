import { useEffect } from 'react';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/auth/authSlice';
import { axiosPrivateInstance } from '../api/axios';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const requestIntercept = axiosPrivateInstance.interceptors.request.use(
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

    const responseIntercept = axiosPrivateInstance.interceptors.response.use(
      // response is good
      (response) => response,
      // response is bad due to 토큰 만료
      async (error) => {
        const prevRequest = error?.config;
        // expire access token == 401 error
        // 참고영상 status 403이 토큰 만료
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh(); // 토큰 갱신
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          // request again
          return axiosPrivateInstance(prevRequest);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      // interceptors 제거
      axiosPrivateInstance.interceptors.request.eject(requestIntercept);
      axiosPrivateInstance.interceptors.response.eject(responseIntercept);
    };
  }, [user, refresh]);
  // interceptor를 포함한 인스턴스를 반환한다.
  return axiosPrivateInstance;
};

export default useAxiosPrivate;
