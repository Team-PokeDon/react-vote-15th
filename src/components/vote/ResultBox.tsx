import masterball from '../../assets/masterball.png';
import styled, { css } from 'styled-components';
import { ICandidate } from '../../lib/types/candidates';
import { useAppSelector } from '../../store/app/hooks';
import Loading from '../common/Loading';
function ResultBox({ list }: { list: ICandidate[] }) {
  const pending = useAppSelector((state) => state.candidate.pending);

  let tie: number | null = null;
  const realRank = (i: number) => {
    if (i == 0) return i + 1;
    if (list[i].vote_count === list[i - 1].vote_count) {
      if (tie != null) {
        return tie;
      } else {
        tie = i;
        return i;
      }
    } else {
      tie = null;
      return i + 1;
    }
  };

  return (
    <Wrapper pending={pending}>
      {pending ? (
        <Loading />
      ) : (
        <>
          {list.map((v, i) => (
            <ResultItem key={v.id} rank={realRank(i)}>
              <Rank rank={realRank(i)}>{realRank(i)}</Rank>
              <Name rank={realRank(i)}>{v.user_name}</Name>
              <Count>
                <div>실시간 득표수</div>
                {v.vote_count}
              </Count>
            </ResultItem>
          ))}
        </>
      )}
    </Wrapper>
  );
}

export default ResultBox;

const Wrapper = styled.div<{ pending: boolean }>`
  border: 1px solid ${({ theme }) => theme.palette.gray[2]};
  border-radius: 8px;
  background-color: #fff;
  height: 550px;
  ${({ pending }) =>
    pending &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;
const ResultItem = styled.div<{ rank: number }>`
  display: grid;
  grid-template-columns: 40px auto 90px;
  padding: 12px;
  &:first-child {
    border-radius: 8px 8px 0px 0px;
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray[2]};
  }
`;
const Rank = styled.div<{ rank: number }>`
  font-size: 36px;
  font-weight: 700;
  ${({ rank }) =>
    rank <= 3
      ? css`
          color: ${({ theme }) => theme.palette.cyan[1 + rank * 2]};
        `
      : css`
          color: ${({ theme }) => theme.palette.gray[6]};
        `};
`;
const Name = styled.div<{ rank: number }>`
  font-size: 24px;
  font-weight: 700;
  text-align: left;
  line-height: 36px;
  color: ${({ theme }) => theme.palette.gray[8]};
  ${({ rank }) =>
    rank == 1 &&
    css`
      :after {
        content: '';
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
        background-image: url(${masterball});
        display: inline-block;
        position: relative;
        top: 1px;
        left: 8px;
      }
    `}
`;
const Count = styled.div`
  font-size: 24px;
  line-height: 33px;
  font-weight: 700;
  display: flex;

  color: ${({ theme }) => theme.palette.gray[5]};
  div {
    font-size: 12px;
    margin-right: 8px;
  }
`;
