import { getCandidateThunk } from '../../store/candidate';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { ICandidate } from '../types/candidates';

function useCandidates(part: string): ICandidate[] {
  const dispatch = useAppDispatch();
  dispatch(getCandidateThunk(part));
  const list = useAppSelector((state) =>
    part == 'FE' ? state.candidate.FEList : state.candidate.BEList,
  );

  return list;
}

export default useCandidates;
