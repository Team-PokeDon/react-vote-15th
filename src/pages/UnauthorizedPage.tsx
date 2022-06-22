import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import oak from '../assets/oak.jpeg';

function UnauthorizedPage() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <Wrapper>
      <img src={oak} />
      <Message>
        <div>
          ･･････바깥은 혼자 돌아다니기엔 위험하단다!
          <br /> 오른쪽 버튼을 눌러 다시 뒤로 돌아가렴
        </div>
        <button onClick={goBack}>뒤로 가기</button>
      </Message>
    </Wrapper>
  );
}

export default UnauthorizedPage;

const Wrapper = styled.div`
  img {
    width: 466px;
    margin-top: 100px;
    border-radius: 16px;
  }
  button {
    display: block;
  }
`;

const Message = styled.div`
  margin-top: 8px;
  display: flex;
  outline: 5px double ${({ theme }) => theme.palette.cyan[7]};
  border-radius: 16px;
  justify-content: space-between;
  padding: 24px 16px;
  line-height: 20px;
  font-weight: 700;
`;
