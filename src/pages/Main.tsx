import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Main() {
  const user = {
    name: '한규진',
    email: 'david0218@naver.com',
    part: 'FE',
    token: [],
  };
  const navigate = useNavigate();

  const handleClickVote = useCallback(() => {
    navigate(`/vote/${user.part}`);
  }, []);
  const handleClickFEResult = useCallback(() => {
    navigate(`/result/FE`);
  }, []);
  const handleClickBEResult = useCallback(() => {
    navigate(`/result/BE`);
  }, []);

  return (
    <Wrapper>
      <button onClick={handleClickVote}>투표하러 가기</button>
      <button onClick={handleClickFEResult}>FE 결과 보기</button>
      <button onClick={handleClickBEResult}>BE 결과 보기</button>
    </Wrapper>
  );
}

export default Main;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  button:first-child {
    grid-column: 1 / 2;
  }
`;
