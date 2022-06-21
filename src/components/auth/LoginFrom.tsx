// JSON Web Token
// access token == short time 발급 (5 ~ 15분)
// <- APP이 close 되면 자동으로 파괴된다. // do not store in local storage or cookie
// JS에 저장하게 되면 해킹의 위험이 있다. // 메모리에 저장해야 한다!
// refresh token == long time
// 로그아웃 전에 만료되면 재발급 해야한다.

// xss, csrf에 대한 위험이 있음

// refresh token 또한 받았지만 로컬에 저장되지 않는다.
// JS가 접근할 수도 없다
// 필요한 경우 axios가 다시 서버로 보낸다. <- 데이터를 요청할 때
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from '../../lib/api/axios';
import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
import { selectPersist, setUserData } from '../../store/auth/authSlice';
import Button from '../common/Button';
import useLocalStorage from '../../lib/hooks/useLocalStorage';
import useInput from '../../lib/hooks/useInput';
import useToggle from '../../lib/hooks/useToggle';

const LOGIN_URL = '/users/login/';

function LoginForm() {
  const persist = useAppSelector(selectPersist);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  // @ts-expect-error
  const from = location.state?.from?.pathname || '/';

  // const [email, setEmail] = useLocalStorage('user', ''); //useState('');
  const [email, resetEmail, emailAttribs] = useInput('email', ''); //useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [check, toggleCheck] = useToggle('persist', false); // context에 더이상 저장하지 않아도됨!!!
  // const [success, setSuccess] = useState(false);

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
      // setEmail('');
      resetEmail();
      setPwd('');
      // setSuccess(true);
      // 로그인 페이지로 접근하기전에 향하고자 했던 페이지로 들어가게 된다.
      navigate(from, { replace: true });
      // navigate(`vote/backend`);
      // 그냥 파트별로 이동하는걸로 바꾸어야할듯!
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg('서버가 응답하지 않습니다.');
      } else {
        setErrMsg('로그인에 실패했습니다.');
      }
    }
  };

  // const togglePersist = () => {
  //   // setPersist(prev => !prev);
  //   dispatch(togglePersist);
  // };

  // useEffect(() => {
  //   localStorage.setItem('persist', persist);
  // }, [persist]);

  return (
    <>
      {/* {success ? (
        <section>
          <h1>로그인에 성공했습니다!</h1>
          <Footer>
            <Link to="/vote">투표하러 가기</Link>
          </Footer>
        </section>
      ) : ( */}
      <section>
        <form onSubmit={handleSubmit}>
          <StyledInput
            placeholder="이메일"
            type="text"
            autoFocus
            autoComplete="off"
            // onChange={(e) => setEmail(e.target.value)}
            // value={email}
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
              // onChange={togglePersist}
              onChange={toggleCheck}
              // checked={persist}
              checked={check}
            />
            <label htmlFor="persist">&nbsp;이 기기를 신뢰하겠습니까?</label>
          </PersistCheck>
          <ButtonWithMarginTop cyan fullWidth>
            로그인
          </ButtonWithMarginTop>
        </form>
        <Footer>
          <Link to="/register">회원가입</Link>
          <span className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</span>
        </Footer>
      </section>
      {/* )} */}
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
  // TODO: checkbox styling
`;
