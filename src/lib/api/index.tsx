import API from './axiosConfig';

export const getCandidates = async (part: string) => {
  const response = await API.get(`/candidates/?part=${part}`);
  return response.data;
};
export const postVote = async (id: number) => {
  console.log(id);
  const response = await API.post(`votes/`, { candidate: id });
  return response.data;
};
