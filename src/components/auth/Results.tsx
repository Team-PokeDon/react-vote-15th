import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../lib/hooks/useAxiosPrivate';
import useRefreshToken from '../../lib/hooks/useRefreshToken';
import axios from '../../lib/api/axios';

function Results() {
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();
  const location = useLocation();

  function handleClick() {
    const controller = new AbortController();
    const requestVote = async () => {
      try {
        const response = await axiosPrivate.post(
          '/votes/',
          JSON.stringify({ candidate: '8' }),
          {
            signal: controller.signal,
          },
        );
        console.log('fetch 성공.');
        console.log(response.data);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };
    requestVote();
    return () => {
      controller.abort(); // abort any pending request
    };
  }

  // component mount 버전
  // const [results, setResults] = useState<any>();
  //   const requestVote = async () => {
  //     try {
  //       // 1. axiosPrivate은 access token이 만료된 경우 재요청 과정을 포함한다.
  //       const response = await axiosPrivate.post(
  //         '/votes/',
  //         JSON.stringify({ candidate: '8' }),
  //         {
  //           // 필요 시 request를 cancel 하기 위해 signal을 추가한다.
  //           signal: controller.signal,
  //         },
  //       );
  //       console.log('fetch 성공.');
  //       console.log(response.data);
  //       isMounted && setResults(response.data);
  //     } catch (err) {
  //       // 2. refresh token이 만료된 경우는 재로그인 해야한다.
  //       // 재로그인 후 원래의 위치로 리다이랙트 시킨다.
  //       console.error(err);
  //       navigate('/login', { state: { from: location }, replace: true });
  //     }
  //   };
  //   requestVote();
  //   return () => {
  //     isMounted = false;
  //     // component가 unmount 되면 request를 cancel 한다.
  //     controller.abort(); // abort any pending request
  //   };
  // }, []);

  return (
    <>
      <h1>Results List</h1>
      {/* 다음 버튼은 테스트를 위한 것이다. */}
      <button onClick={() => refresh()}>Refresh</button>
      <button onClick={handleClick}>Request with Access Token</button>
    </>
  );
}

export default Results;
