import useAxiosPrivate from '../lib/hooks/auth/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import useRefreshToken from '../lib/hooks/auth/useRefreshToken';

function BEVotePage() {
  // const refresh = useRefreshToken();
  // const axiosPrivate = useAxiosPrivate();

  // const navigate = useNavigate();
  // const location = useLocation();

  // const handleClick = async () => {
  //   try {
  //     const response = await axiosPrivate.post(
  //       '/votes/',
  //       JSON.stringify({
  //         candidate: '3',
  //       }),
  //       {},
  //     );
  //     console.log(response?.data);
  //   } catch (err: any) {
  //     console.log(err);
  //     if (err?.response?.status == 400) {
  //       console.log(
  //         '동일 유저가 동일 후보자한테 투표할 경우 400에러가 발생합니다.',
  //       );
  //     } else {
  //       navigate('/login', { state: { from: location }, replace: true });
  //     }
  //   }
  // };

  return (
    <>
      <div>Backend Vote</div>
      {/* <button onClick={() => refresh()}>Refresh</button>
      <button onClick={handleClick}>Request with Access Token</button> */}
    </>
  );
}

export default BEVotePage;
