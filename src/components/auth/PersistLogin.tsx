import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../store/app/hooks';
import useRefreshToken from '../../hooks/auth/useRefreshToken';
import useLocalStorage from '../../hooks/auth/useLocalStorage';
import { selectUser } from '../../store/slices/authSlice';
import Loading from '../common/Loading';
import styled from 'styled-components';

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const user = useAppSelector(selectUser);
  const [persist] = useLocalStorage('persist', false);

  // @ts-expect-error
  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false); // escape memory leak
      }
    };
    // verify only on refresh
    !user?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    return () => (isMounted = false);
  }, []);

  return <>{!persist ? <Outlet /> : isLoading ? <Loading /> : <Outlet />}</>;
}

export default PersistLogin;
