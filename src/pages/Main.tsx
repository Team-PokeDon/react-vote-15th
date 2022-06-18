import { useEffect } from 'react';
import { getCandidateThunk } from '../store/candidate';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/app/hooks';

function Main() {
  const dispatch = useAppDispatch();
  const feList = useAppSelector((state) => state.candidate.FEList);
  const beList = useAppSelector((state) => state.candidate.BEList);
  const user = {
    name: '한규진',
    email: 'david0218@naver.com',
    part: 'FE',
    token: [],
  };
  useEffect(() => {
    dispatch(getCandidateThunk('FE'));
    dispatch(getCandidateThunk('BE'));
  }, []);

  return (
    <>
      <Candidates>
        {feList.map((v) => (
          <div key={v.id}>{v.user_name}</div>
        ))}
      </Candidates>
      <Candidates>
        {beList.map((v) => (
          <div key={v.id}>{v.user_name}</div>
        ))}
      </Candidates>
    </>
  );
}

export default Main;

const Candidates = styled.div``;
