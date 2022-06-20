import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useAxiosPrivate from '../lib/hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';

function BEVotePage() {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users', {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        // 토큰 만료인 경우 // 재로그인 하면 원래 원하던 대로
        console.error(err);
        navigate('/login', { state: { location }, replace: true });
      }
    };
  });

  return <div>BE Vote</div>;
}

export default BEVotePage;
