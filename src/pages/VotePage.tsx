import styled, { css } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/app/hooks';
import Candidate from '../components/vote/Candidate';
import { getCandidateThunk } from '../store/candidate';
import { useEffect, useState } from 'react';
import { postVote } from '../lib/api';
import Loading from '../components/common/Loading';

export type TSelectState = {
  id: number | null;
  user_name: string | null;
};

function VotePage() {
  const { part } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const InitialSelect = {
    id: null,
    user_name: null,
  };
  const [select, setSelect] = useState<TSelectState>(InitialSelect);
  const pending = useAppSelector((state) => state.candidate.pending);
  const user = {
    name: '한규진',
    email: 'email1@naver.com',
    part: 'FE',
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1NzQ2NjQ1LCJpYXQiOjE2NTU2NjAyNDUsImp0aSI6IjgyYzhlZjFkNDk5ZjRkNTc4MTk2Njg2MGIzNzkyY2EwIiwidXNlcl9pZCI6MTJ9.dWUw9Fmyg2hsBZxoFyqljZJeHk_v7_U2K5jixrLioxU',
  };
  useEffect(() => {
    part && dispatch(getCandidateThunk(part));
  }, []);

  const list = part
    ? useAppSelector((state) =>
        part == 'FE' ? state.candidate.FEList : state.candidate.BEList,
      )
    : [];

  const handleVote = async () => {
    if (select.id) {
      if (window.confirm(`${select.user_name}님에게 투표하시겠습니까?`)) {
        try {
          const res = await postVote(select.id);
          if (res.status == 201) {
            navigate(`/result/${part}`);
          }
        } catch (e: any) {
          switch (e.response.data.status) {
            case 400:
              alert('해당 후보에 중복 투표할 수 없습니다.');
              setSelect(InitialSelect);
              break;
            case 401:
              console.log(e.response.data);
              alert('토큰 인증 오류');
              // 토큰 부분 완성되면 마무리하기
              break;
            default:
              return console.error(e.response);
          }
        }
      }
    }
  };

  return (
    <Wrapper pending={pending}>
      {pending ? (
        <Loading />
      ) : (
        <>
          <h1>{part} 투표하기</h1>
          <CandidateList>
            {list.map((candidate) => (
              <div
                onClick={() => {
                  setSelect({
                    id: candidate.id,
                    user_name: candidate.user_name,
                  });
                }}
                key={candidate.id}
              >
                <Candidate candidate={candidate} select={select} />
              </div>
            ))}
          </CandidateList>
          <VoteButton disabled={select.id ? false : true} onClick={handleVote}>
            투표하기
          </VoteButton>
        </>
      )}
    </Wrapper>
  );
}

export default VotePage;

const Wrapper = styled.div<{ pending: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ pending }) => pending && `height: calc(100vh - 80px);`}

  h1 {
    font-size: 36px;
    font-weight: 700;
    margin: 20px 0px;
  }
`;

const CandidateList = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr 1fr 1fr;
`;

const VoteButton = styled.button`
  height: 80px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  font-size: 24px;
  font-weight: 700;
  color: white;
  background-color: ${({ theme }) => theme.palette.cyan[7]};
  cursor: pointer;
  &:disabled {
    background-color: ${({ theme }) => theme.palette.gray[5]};
    cursor: default;
  }
`;
