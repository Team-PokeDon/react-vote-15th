import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResultBox from '../components/vote/ResultBox';
import { useAppDispatch, useAppSelector } from '../store/app/hooks';
import { getCandidateThunk } from '../store/candidate';
import Loading from '../components/common/Loading';
import styled from 'styled-components';

function ResultPage() {
  const { part } = useParams();
  const pending = useAppSelector((state) => state.candidate.pending);
  const dispatch = useAppDispatch();
  useEffect(() => {
    part && dispatch(getCandidateThunk(part));
  }, []);

  const list = part
    ? useAppSelector((state) =>
        part == 'FE' ? state.candidate.FEList : state.candidate.BEList,
      )
    : [];

  return (
    <Wrapper pending={pending}>
      {pending ? (
        <Loading />
      ) : (
        <ResultWrapper>
          <h1>{part} 투표 현황</h1>
          <ResultBox list={list} />
        </ResultWrapper>
      )}
    </Wrapper>
  );
}

export default ResultPage;

const Wrapper = styled.div<{ pending: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ pending }) => pending && `height: calc(100vh - 80px);`}
`;

const ResultWrapper = styled.div`
  width: 466px;
  h1 {
    font-size: 36px;
    font-weight: 700;
    margin: 20px 0px;
  }
`;
