import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/app/hooks';
import Candidate from '../components/vote/Candidate';
import { getCandidateThunk } from '../store/candidate';
import useCandidates from '../lib/hooks/useCandidates';

function VotePage() {
  const { part } = useParams();
  const user = {
    name: '한규진',
    email: 'email1@naver.com',
    part: 'FE',
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU1NzQ2NjQ1LCJpYXQiOjE2NTU2NjAyNDUsImp0aSI6IjgyYzhlZjFkNDk5ZjRkNTc4MTk2Njg2MGIzNzkyY2EwIiwidXNlcl9pZCI6MTJ9.dWUw9Fmyg2hsBZxoFyqljZJeHk_v7_U2K5jixrLioxU',
  };
  const list = part ? useCandidates(part) : [];

  return (
    <div>
      {list.map((candidate) => (
        <Candidate candidate={candidate} />
      ))}
    </div>
  );
}

export default VotePage;
