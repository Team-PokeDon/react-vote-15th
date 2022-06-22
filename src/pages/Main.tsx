import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../store/app/hooks';
function Main() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);
  const handleClickFEVote = useCallback(() => {
    navigate(`/vote/FE`);
  }, []);
  const handleClickBEVote = useCallback(() => {
    navigate(`/vote/BE`);
  }, []);
  const handleClickFEResult = useCallback(() => {
    navigate(`/result/FE`);
  }, []);
  const handleClickBEResult = useCallback(() => {
    navigate(`/result/BE`);
  }, []);

  return (
    <Wrapper>
      <button
        onClick={handleClickFEVote}
        disabled={user.part == 'BE' ? true : false}
      >
        FE 투표하기
      </button>
      <button
        onClick={handleClickBEVote}
        disabled={user.part == 'FE' ? true : false}
      >
        BE 투표하기
      </button>
      <button onClick={handleClickFEResult}>FE 결과보기</button>
      <button onClick={handleClickBEResult}>BE 결과 보기</button>
    </Wrapper>
  );
}

export default Main;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px 48px;
  width: 466px;
  margin-top: 120px;

  button {
    border-radius: 8px;
    height: 120px;
    border: none;
    font-size: 24px;
    color: white;
    font-weight: 700;
    background-color: #fedd48;
    :hover {
      background-color: #f3d445;
    }
  }

  button:first-child,
  button:nth-child(2) {
    height: 200px;
    background-color: ${({ theme }) => theme.palette.cyan[4]};
    font-size: 36px;
    :hover {
      background-color: ${({ theme }) => theme.palette.cyan[5]};
    }
    :disabled {
      background-color: ${({ theme }) => theme.palette.gray[3]};
    }
  }
`;
