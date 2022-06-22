import { API, privateAPI } from './axiosConfig';
export const getCandidates = async (part: string) => {
  const response = await API.get(`/candidates/?part=${part}`);
  return response.data;
};
export const postVote = async (id: number) => {
  const response = await privateAPI.post(`/votes/`, { candidate: id });
  return response.data;
};

export const postLogout = async () => {
  const response = await privateAPI.post(`/users/logouts`);
  return response.data;
};
