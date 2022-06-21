import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../lib/hooks/useAxiosPrivate';
import useRefreshToken from '../../lib/hooks/useRefreshToken';
import axios from '../../lib/api/axios';

function Results() {
  const [results, setResults] = useState<any>();
  const refresh = useRefreshToken();
  // const axiosPrivate = useAxiosPrivate();
  // const navigate = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    // cancelation token 보다 최신 방법이다.
    const controller = new AbortController();
    const getResults = async () => {
      try {
        // axios 사용 시 token을 포함하지 않기 때문에 fetch에 실패한다.
        const response = await axios.get('/candidates/?part=BE/', {
          // 필요 시 request를 cancel 하기 위해 signal을 추가한다.
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setResults(response.data);
      } catch (err) {
        // 토큰 만료인 경우 재로그인 요구
        console.error(err);
        // navigate('/login', { state: { location }, replace: true });
      }
    };
    getResults();
    return () => {
      isMounted = false;
      // component가 unmount 되면 request를 cancel 한다.
      controller.abort(); // abort any pending request
    };
  }, []);
  return (
    <>
      <h1>Results List</h1>
      {results?.length ? (
        <ul>
          {results.map((result: any, i: any) => (
            <li key={i}>{result?.user_name}</li>
          ))}
        </ul>
      ) : (
        <p>No Users to display</p>
      )}
      <button onClick={() => refresh()}>Refresh</button>
    </>
  );
}

export default Results;
