import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../store/app/hooks';
function Main() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);
  const handleClickVote = useCallback(() => {
    if (user.part) {
      navigate(`/vote/${user.part}`);
    } else {
      if (confirm(`로그인이 필요한 페이지입니다. 로그인하시겠습니까?`)) {
        navigate(`/login`);
      }
    }
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
      <button onClick={handleClickFEResult}>FE 결과보기</button>
      <button onClick={handleClickBEResult}>BE 결과 보기</button>
    </Wrapper>
  );
}

export default Main;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  width: 466px;
  margin-top: 120px;

  button {
    border-radius: 8px;
    height: 120px;
    border: none;
    font-size: 24px;
    color: white;
    font-weight: 700;
    background-color: ${({ theme }) => theme.palette.gray[4]};
    :hover {
      background-color: ${({ theme }) => theme.palette.gray[5]};
    }
  }

  button:first-child {
    grid-column: span 2;
    height: 200px;
    background-color: ${({ theme }) => theme.palette.cyan[4]};
    font-size: 48px;
    :hover {
      background-color: ${({ theme }) => theme.palette.cyan[5]};
    }
  }
`;
