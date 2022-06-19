import { getCandidateThunk } from '../../store/candidate';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { useEffect } from 'react';
import styled from 'styled-components';

function Candidates({ part }: { part: string }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(`useEffect${part}`);
    dispatch(getCandidateThunk(part));
  }, []);
  const list = useAppSelector((state) =>
    part == 'FE' ? state.candidate.FEList : state.candidate.BEList,
  );

  return (
    <Box>
      <h2>{part}</h2>
      {list.map((v) => (
        <div key={v.id}>
          {v.user_name} {v.vote_count}
        </div>
      ))}
    </Box>
  );
}

export default Candidates;

const Box = styled.div``;
