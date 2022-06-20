import styled from 'styled-components';
import { ICandidate } from '../../lib/types/candidates';

function Candidate({ candidate }: { candidate: ICandidate }) {
  return <Wrapper>{candidate.user_name}</Wrapper>;
}

export default Candidate;

const Wrapper = styled.div``;
