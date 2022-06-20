import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/auth/authSlice';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  // refresh
  // global auth
  const user = useAppSelector(selectUser);

  // access 토큰 만료 여부를 검사하고 만료 시 새로운 access token을 발급
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        // await refresh();
        // global state에 기존의 데이터를 set하는 과정 포함
      } catch (err) {
        console.log(err);
      } finally {
        // escape loading loop
        setIsLoading(false);
      }
    };
    !user?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(user?.accessToken)}`);
  }, [isLoading]);

  // persist에 따른 확인 로직 추가
  // persist 체크 컴포넌트 로그인에 추가
  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
}

export default PersistLogin;
