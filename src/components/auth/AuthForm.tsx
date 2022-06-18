import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

type TTextMap = {
  [type: string]: string;
  login: string;
  register: string;
};

const textMap: TTextMap = {
  login: '로그인',
  register: '회원가입',
};

function AuthForm({
  type,
  userEmail,
  userName,
  userPassword,
  handleInputsChange,
  handleAuthFormSubmit,
  handleRadio,
}: any) {
  const text = textMap[type];
  return (
    <>
      <form onSubmit={handleAuthFormSubmit}>
        <StyledInput
          name="userEmail"
          placeholder="이메일"
          value={userEmail}
          onChange={handleInputsChange}
        />
        <StyledInput
          name="userName"
          placeholder="이름"
          value={userName}
          onChange={handleInputsChange}
        />
        <StyledInput
          name="userPassword"
          placeholder="비밀번호"
          value={userPassword}
          onChange={handleInputsChange}
        />
        <RadioWrapper>
          <label>
            <input
              type="radio"
              name="userPart"
              value="frontend"
              onClick={handleRadio}
            />
            &nbsp;Frontend
          </label>
          <label>
            <input
              type="radio"
              name="userPart"
              value="backend"
              onClick={handleRadio}
            />
            &nbsp;Backend
          </label>
        </RadioWrapper>
        <ButtonWithMarginTop cyan fullWidth>
          {text}
        </ButtonWithMarginTop>
      </form>
      <Footer>
        {type === 'login' ? (
          <Link to="/register">회원가입</Link>
        ) : (
          <Link to="/">로그인</Link>
        )}
      </Footer>
    </>
  );
}

export default AuthForm;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;

  &:focus {
    border-bottom: 1px solid ${({ theme }) => theme.palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 1rem;
  text-align: right;
  a {
    color: ${({ theme }) => theme.palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${({ theme }) => theme.palette.gray[9]};
    }
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const RadioWrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: 1px solid ${({ theme }) => theme.palette.gray[1]};

  label {
    margin-right: 2rem;
    color: ${({ theme }) => theme.palette.gray[6]};
    &:hover {
      color: ${({ theme }) => theme.palette.gray[9]};
    }
    input:checked + label {
      color: red;
    }
  }
`;

// const ErrorMessage = styled.div`
//   color: red;
//   text-align: center;
//   font-size: 0.875rem;
//   margin-top: 1rem;
// `;
