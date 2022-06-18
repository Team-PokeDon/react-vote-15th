import API from './axiosConfig';

export const getCandidates = async (part: string) => {
  const response = await API.get(`/candidates/?part=${part}`);
  return response.data;
};
