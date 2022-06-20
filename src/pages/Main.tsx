import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Main() {
  const user = {
    name: '한규진',
    email: 'david0218@naver.com',
    part: 'BE',
    token: [],
  };
  const navigate = useNavigate();

  const handleClickVote = useCallback(() => {
    navigate(`/vote/${user.part}`);
  }, []);
  const handleClickFEResult = useCallback(() => {
    navigate(`/result/FE`);
  }, []);
  const handleClickBEResult = useCallback(() => {
    navigate(`/result/BE`);
  }, []);

  return (
    <>
      <button onClick={handleClickVote}>투표하러 가기</button>
      <button onClick={handleClickFEResult}>FE 결과 보기</button>
      <button onClick={handleClickBEResult}>BE 결과 보기</button>
    </>
  );
}

export default Main;
