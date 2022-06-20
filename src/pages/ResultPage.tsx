import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ResultBox from '../components/vote/ResultBox';
import useCandidates from '../lib/hooks/useCandidates';
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

  return <Wrapper>{pending ? <Loading /> : <ResultBox list={list} />}</Wrapper>;
}

export default ResultPage;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
`;
