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

// const AuthForm = ({ type, form, onChange, onSubmit, error }: any) => {
function AuthForm({ type }: any) {
  const text = textMap[type];
  return (
    <>
      {/* <form onSubmit={onSubmit}> */}
      <form>
        <StyledInput
          autoComplete="username"
          name="username"
          placeholder="아이디"
          // onChange={onChange}
          // value={form.username}
        />
        <StyledInput
          autoComplete="new-password"
          name="password"
          placeholder="비밀번호"
          type="password"
          // onChange={onChange}
          // value={form.password}
        />
        {type === 'register' && (
          <StyledInput
            autoComplete="new-password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            type="password"
            // onChange={onChange}
            // value={form.passwordConfirm}
          />
        )}
        {/* {error && <ErrorMessage>{error}</ErrorMessage>} */}
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

// const ErrorMessage = styled.div`
//   color: red;
//   text-align: center;
//   font-size: 0.875rem;
//   margin-top: 1rem;
// `;
