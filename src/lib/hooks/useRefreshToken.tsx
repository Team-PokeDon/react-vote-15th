import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { selectUser, setUser } from '../../store/auth/authSlice';
import axiosRefresh, { axiosPrivate } from '../api/axios';
import axios from '../api/axios';

// const useAxiosRefresh = () => {
//   const user = useAppSelector(selectUser);

//   useEffect(() => {
//     const requestIntercept = axiosRefresh.interceptors.request.use(
//       (config) => {
//         // @ts-expect-error
//         if (!config.headers['Refresh-Authorization']) {
//           // @ts-expect-error
//           config.headers[
//             'Refresh-Authorization'
//           ] = `${user.token.refreshToken}`;
//         }
//         return config;
//       },
//       (error) => Promise.reject(error),
//     );

//     // TODO: 필요한지 고민
//     const responseIntercept = axiosRefresh.interceptors.response.use(
//       (response) => response,
//       async (error) => {
//         return Promise.reject(error);
//       },
//     );
//     return () => {
//       axiosRefresh.interceptors.request.eject(requestIntercept);
//       axiosRefresh.interceptors.response.eject(responseIntercept);
//     };
//   }, [user]);
//   return axiosRefresh;
// };

const useRefreshToken = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const refresh = async () => {
    const response = await axios.post('/refreshes/', {
      headers: { 'Refresh-Authorization': `${user.token.refreshToken}` },
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

// const useRefreshToken = () => {
//   const dispatch = useAppDispatch();
//   const refresh = async () => {
//     const response = await axios.get('/refresh', {
//       withCredentials: true,
//     });
//     // overwrite with a new access token, prev state from the server
//     dispatch(setUser(response?.data?.detail));
//     // return the new access token
//     return response.data.token.access_token;
//   };
//   // access token을 refresh 하는 함수를 반환한다.
//   return refresh;
// };
