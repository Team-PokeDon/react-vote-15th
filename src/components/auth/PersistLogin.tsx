import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../store/app/hooks';
// import { selectPersist, selectUser } from '../../store/auth/authSlice';
import useRefreshToken from '../../lib/hooks/useRefreshToken';
import useLocalStorage from '../../lib/hooks/useLocalStorage';
import { selectUser } from '../../store/auth/authSlice';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const user = useAppSelector(selectUser);
  const persist = useLocalStorage('persist', false);

  // @ts-expect-error
  useEffect(() => {
    let isMounted = true;
    // access 토큰 만료 여부를 검사하고 만료 시 새로운 access token을 발급
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        // RequireAuth component로 향하기 전 new access token을 얻음
        // global state에 기존의 데이터를 set하는 과정 포함!
      } catch (err) {
        console.error(err);
      } finally {
        // escape loading loop
        // unmounted component에 대한 set 방지
        isMounted && setIsLoading(false);
      }
    };
    // 권한이 필요한 페이지에 접근하는 경우 매번이 아닌 App state가 비어있는 경우만 검사!
    !user?.token.accessToken ? verifyRefreshToken() : setIsLoading(false);
    return () => (isMounted = false); // <-- 해결해야됨
  }, []);

  // test
  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(user?.token.accessToken)}`);
  }, [isLoading]);

  // persist에 따른 확인 로직 추가
  // persist 체크 컴포넌트 로그인에 추가
  // return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
}

export default PersistLogin;
