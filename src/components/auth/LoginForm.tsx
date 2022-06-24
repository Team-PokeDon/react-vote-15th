import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { axiosPublic } from '../../lib/api/axios';
import { useAppDispatch } from '../../store/app/hooks';
import Button from '../common/Button';
import useInput from '../../lib/hooks/auth/useInput';
import useToggle from '../../lib/hooks/auth/useToggle';
import { setUser } from '../../store/slices/authSlice';
import axios from 'axios';
import useDecodeAccessToken from '../../lib/hooks/api/useDecodeAccessToken';
import { isElementAccessChain } from 'typescript';
import jwt_decode from 'jwt-decode';

function LoginForm() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  // @ts-expect-error
  const from = location.state?.from?.pathname || '/';

  const [email, resetEmail, emailAttribs] = useInput('email', ''); // localStorage
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [persistCheck, togglePersistCheck] = useToggle('persist', false); // localStorage

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosPublic.post(
        '/users/logins/',
        JSON.stringify({ email, password: pwd }),
        {},
      );
      console.log(response);
      const fetchedEmail = response.data.detail.email;
      const fetchedAccessToken = response.data.detail.token.access_token;

      dispatch(
        setUser({ email: fetchedEmail, accessToken: fetchedAccessToken }),
      );
      resetEmail();
      setPwd('');
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        if (!error?.response) {
          setErrMsg('서버가 응답하지 않습니다.');
        } else {
          setErrMsg('이메일, 비밀번호를 확인해주세요.');
        }
      }
    }
  };
  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <StyledInput
            placeholder="이메일"
            type="text"
            autoFocus
            autoComplete="off"
            {...emailAttribs}
            required
          />
          <StyledInput
            placeholder="비밀번호"
            type="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <PersistCheck>
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersistCheck}
              checked={persistCheck}
            />
            <label htmlFor="persist">&nbsp;자동 로그인</label>
          </PersistCheck>
          <ButtonWithMarginTop
            cyan
            fullWidth
            disabled={!email || !pwd ? true : false}
          >
            로그인
          </ButtonWithMarginTop>
        </form>
        <Footer>
          <Link to="/register">회원가입</Link>
          <span className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</span>
        </Footer>
      </section>
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
    margin-top: 1.1rem;
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1.1rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.1rem;
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

const PersistCheck = styled.div`
  margin-top: 1.1rem;
  color: 1px solid ${({ theme }) => theme.palette.gray[1]};
  label {
    color: ${({ theme }) => theme.palette.gray[6]};
    &:hover {
      color: ${({ theme }) => theme.palette.gray[9]};
      cursor: pointer;
    }
  }
  input[type='checkbox']:checked + label {
    color: ${({ theme }) => theme.palette.gray[9]};
    &:hover {
      color: ${({ theme }) => theme.palette.gray[9]};
      cursor: pointer;
    }
  }
`;
