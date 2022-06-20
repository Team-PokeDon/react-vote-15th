import styled from 'styled-components';
import { ICandidate } from '../../lib/types/candidates';
import { TSelectState } from '../../pages/VotePage';

type TCandidateProps = {
  candidate: ICandidate;
  select: TSelectState;
};

function Candidate({ candidate, select }: TCandidateProps) {
  const selected = select.id === candidate.id ? true : false;

  return (
    <Wrapper selected={selected}>
      <div>
        <Name>{candidate.user_name}</Name>
        <Team>{candidate.team}</Team>
      </div>
      <Count>
        <div>실시간 득표수</div>
        {candidate.vote_count}
      </Count>
    </Wrapper>
  );
}

export default Candidate;

const Wrapper = styled.div<{ selected: boolean }>`
  height: 150px;
  width: 150px;
  border: 1px solid
    ${({ selected }) =>
      selected
        ? ({ theme }) => theme.palette.cyan[2]
        : ({ theme }) => theme.palette.gray[2]};
  border-radius: 8px;
  padding: 16px;
  background-color: ${({ selected }) =>
    selected
      ? ({ theme }) => theme.palette.cyan[1]
      : ({ theme }) => theme.palette.gray[1]};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.normal};
  }
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: 700;
`;
const Team = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-top: 6px;
  color: ${({ theme }) => theme.palette.cyan[5]};
`;
const Count = styled.div`
  font-size: 48px;
  font-weight: 700;
  margin-top: auto;
  color: ${({ theme }) => theme.palette.gray[5]};
  margin-left: auto;
  display: flex;
  align-items: flex-end;
  div {
    font-size: 12px;
    margin-bottom: 10px;
    margin-right: 5px;
  }
`;
