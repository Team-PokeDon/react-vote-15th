export interface ICandidate {
  id: number;
  candidate_votes: [
    {
      id: number;
      candidate: number;
      user: number;
    },
  ];
  created_at: string;
  updated_at: string;
  status: string;
  user_name: string;
  age: number;
  part: 'FE' | 'BE';
  team: '포켓돈' | '파운더' | 'Mo MU' | '헬시어' | 'All.G';
  vote_count: number;
}

export interface ICandidateListState {
  FEList: ICandidate[];
  BEList: ICandidate[];
  pending: boolean;
}
