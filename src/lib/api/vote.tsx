import API from './axiosConfig';

export const getCandidates = async (part: string) => {
  const response = await API.get(`/candidates/?part=${part}`);
  return response.data;
};

export const postRegister = async () => {
  const response = await API.post(`/users/signups/`, {
    name: '한규진',
    password: 'password1',
    email: 'email11@naver.com',
    part: 'FE',
  });
  return response.data;
};
