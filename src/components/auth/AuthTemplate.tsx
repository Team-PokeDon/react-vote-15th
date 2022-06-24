import styled from 'styled-components';
import { Link } from 'react-router-dom';

type TAuthTemplateProps = {
  children: React.ReactNode;
};

function AuthTemplate({ children }: TAuthTemplateProps) {
  return (
    <AuthTemplateBlock>
      <WhiteBox>
        <div className="header-area">
          <Link to="/">CEOS 운영진 선출 투표</Link>
        </div>
        {children}
      </WhiteBox>
    </AuthTemplateBlock>
  );
}

export default AuthTemplate;

const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${({ theme }) => theme.palette.gray[2]};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  .header-area {
    display: block;
    padding-bottom: 2.3rem;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 2px;
  }

  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
`;
