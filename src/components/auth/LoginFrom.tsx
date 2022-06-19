import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../lib/api/axios';
import { useAppDispatch } from '../../store/app/hooks';
import { setUserData } from '../../store/auth/authSlice';
import Button from '../common/Button';

const LOGIN_URL = '/users/login';

function LoginForm() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password: pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          // withCredentials: true,
        },
      );
      console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      const id = response?.data?.detail.id;
      const name = response?.data?.detail.name;
      const part = response?.data?.detail.part;
      const accessToken = response?.data?.detail.token.access_token;
      dispatch(setUserData({ id, name, email, part, accessToken }));
      setEmail('');
      setPwd('');
      setSuccess(true);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg('서버가 응답하지 않습니다.');
      } else {
        setErrMsg('로그인에 실패했습니다.');
      }
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>로그인에 성공했습니다!</h1>
          <Footer>
            <Link to="/vote">투표하러 가기</Link>
          </Footer>
        </section>
      ) : (
        <section>
          <form onSubmit={handleSubmit}>
            <StyledInput
              placeholder="이메일"
              type="text"
              autoFocus
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <StyledInput
              placeholder="비밀번호"
              type="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <ButtonWithMarginTop cyan fullWidth>
              로그인
            </ButtonWithMarginTop>
          </form>
          <Footer>
            <Link to="/register">회원가입</Link>
            <span className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</span>
          </Footer>
        </section>
      )}
    </>
  );
}

export default LoginForm;

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

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  a {
    text-align: right;
    color: ${({ theme }) => theme.palette.cyan[7]};
    text-decoration: underline;
    &:hover {
      color: ${({ theme }) => theme.palette.cyan[9]};
    }
  }
  .errmsg {
    color: red;
  }
  .offscreen {
    position: absolute;
    left: -9999px;
  }
`;
