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
        // initial request // 1. 처음 or 새로고침 시에는 header에 token이 들어있지 않음
        // @ts-expect-error
        if (!config.headers['Authorization']) {
          // @ts-expect-error
          config.headers['Authorization'] = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      // good
      (response) => response,
      // bad
      // 2.
      async (error) => {
        const prevRequest = error?.config;
        // expire access token: 403 // access 토큰 재발급이 필요한 경우
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          // 새로운 access token이 header에 들어감!!!!
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          // access token 만료 -> refresh 하기 -> request 다시함
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );
    // clean up
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [user, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
