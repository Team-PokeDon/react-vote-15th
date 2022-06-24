import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAxiosPrivate from '../lib/hooks/api/useAxiosPrivate';
import useDecodeAccessToken from '../lib/hooks/api/useDecodeAccessToken';
import useRefreshToken from '../lib/hooks/api/useRefreshToken';
import { useAppSelector } from '../store/app/hooks';
import { selectUser } from '../store/slices/authSlice';
function Main() {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const initUser = { user_id: null, part: '', name: '' };

  const { part } = user.accessToken
    ? useDecodeAccessToken(user.accessToken)
    : initUser;

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

  // TODO: delete following test code
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  const handleClick = async () => {
    try {
      const response = await axiosPrivate.post(
        '/votes/',
        JSON.stringify({
          candidate: '3',
        }),
        {},
      );
      console.log(response?.data);
      console.log('투표 성공');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  return (
    <Wrapper>
      <button
        onClick={handleClickFEVote}
        disabled={part == 'BE' ? true : false}
      >
        FE 투표하기
      </button>
      <button
        onClick={handleClickBEVote}
        disabled={part == 'FE' ? true : false}
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
