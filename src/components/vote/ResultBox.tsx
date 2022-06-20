import { getCandidateThunk } from '../../store/candidate';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { useEffect } from 'react';
import styled from 'styled-components';
import useCandidates from '../../lib/hooks/useCandidates';
import { ICandidate } from '../../lib/types/candidates';

function ResultBox({ list }: { list: ICandidate[] }) {
  return (
    <Box>
      {list.map((v) => (
        <div key={v.id}>
          {v.user_name} {v.vote_count}
        </div>
      ))}
    </Box>
  );
}

export default ResultBox;

const Box = styled.div``;
