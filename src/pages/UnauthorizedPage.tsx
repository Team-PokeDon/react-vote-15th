import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function UnauthorizedPage() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <>
      <div>Unauthorized</div>
      <button onClick={goBack}>Go Back</button>
    </>
  );
}

export default UnauthorizedPage;

const UnauthorizedBlock = styled.div``;
