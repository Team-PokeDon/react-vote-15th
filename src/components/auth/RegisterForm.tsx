import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Button from '../common/Button';
// import axios from './api/axios';

const USER_REGEX = /^[가-힣a-zA-Z]+$/;
const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const REGISTER_URL = '/register';

function RegisterForm() {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLSpanElement>(null);

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [part, setPart] = useState('');
  function handleRadioBtnClick(e: any) {
    setPart(e.target.value);
  }
  const [validPart, setValidPart] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    if (part === 'frontend' || part === 'backend') {
      setValidPart(true);
    } else {
      setValidPart(false);
    }
  }, [part]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(user, pwd, email, part);
    setSuccess(true);
    // try {
    //   const response = await axios.post(
    //     REGISTER_URL,
    //     JSON.stringify({ user, pwd }),
    //     {
    //       headers: { 'Content-Type': 'application/json' },
    //       withCredentials: true,
    //     },
    //   );
    //   console.log(response?.data);
    //   console.log(response?.accessToken);
    //   console.log(JSON.stringify(response));
    //   setSuccess(true);
    //   //clear state and controlled inputs
    //   //need value attrib on inputs for this
    //   setUser('');
    //   setPwd('');
    //   setMatchPwd('');
    // } catch (err) {
    //   if (!err?.response) {
    //     setErrMsg('No Server Response');
    //   } else if (err.response?.status === 409) {
    //     setErrMsg('Username Taken');
    //   } else {
    //     setErrMsg('Registration Failed');
    //   }
    // }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>회원가입에 성공했습니다.</h1>
          <Footer>
            <Link to="/">로그인</Link>
          </Footer>
        </section>
      ) : (
        <section>
          <form onSubmit={handleSubmit}>
            {/* username */}
            <InputWrapper>
              <div className="input-positioner">
                <StyledInput
                  placeholder="이름"
                  type="text"
                  autoFocus
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <ValidIcon>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validName || !user ? 'hide' : 'invalid'}
                  />
                </ValidIcon>
              </div>
              <Instruction>
                <span
                  className={
                    userFocus && user && !validName
                      ? 'instruction'
                      : 'offscreen'
                  }
                >
                  이름은 한글 혹은 영문이어야 합니다.
                </span>
              </Instruction>
            </InputWrapper>

            {/* password */}
            <InputWrapper>
              <div className="input-positioner">
                <StyledInput
                  placeholder="비밀번호"
                  type="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <ValidIcon>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPwd || !pwd ? 'hide' : 'invalid'}
                  />
                </ValidIcon>
              </div>
              <Instruction>
                <span
                  className={
                    pwdFocus && pwd && !validPwd ? 'instruction' : 'offscreen'
                  }
                >
                  비밀번호는 8자 이상의 영문과 숫자 조합이어야 합니다.
                </span>
              </Instruction>
            </InputWrapper>

            {/* confirm password */}
            <InputWrapper>
              <div className="input-positioner">
                <StyledInput
                  placeholder="비밀번호 확인"
                  type="password"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <ValidIcon>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validMatch && matchPwd ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validMatch || !matchPwd ? 'hide' : 'invalid'}
                  />
                </ValidIcon>
              </div>
              <Instruction>
                <span
                  className={
                    matchFocus && matchPwd && !validMatch
                      ? 'instruction'
                      : 'offscreen'
                  }
                >
                  비밀번호가 일치하지 않습니다.
                </span>
              </Instruction>
            </InputWrapper>

            {/* email */}
            <InputWrapper>
              <div className="input-positioner">
                <StyledInput
                  placeholder="이메일"
                  type="text"
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
                <ValidIcon>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validEmail ? 'valid' : 'hide'}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validEmail || !email ? 'hide' : 'invalid'}
                  />
                </ValidIcon>
              </div>
              <Instruction>
                <span
                  className={
                    emailFocus && email && !validName
                      ? 'instruction'
                      : 'offscreen'
                  }
                >
                  올바른 이메일 형식이 아닙니다.
                </span>
              </Instruction>
            </InputWrapper>

            <RadioWrapper>
              <input
                name="part"
                type="radio"
                id="frontend"
                value="frontend"
                onClick={handleRadioBtnClick}
              />
              <label htmlFor="frontend">&nbsp;Frontend</label>
              <input
                name="part"
                type="radio"
                id="backend"
                value="backend"
                onClick={handleRadioBtnClick}
              />
              <label htmlFor="backend">&nbsp;Backend</label>
            </RadioWrapper>

            <ButtonWithMarginTop
              cyan
              fullWidth
              disabled={
                !validName ||
                !validPwd ||
                !validMatch ||
                !validEmail ||
                !validPart
                  ? true
                  : false
              }
            >
              회원가입
            </ButtonWithMarginTop>

            <Footer>
              <ErrMsg ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
                {errMsg}
              </ErrMsg>
              <Link to="/">로그인</Link>
            </Footer>
          </form>
        </section>
      )}
    </>
  );
}

export default RegisterForm;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & + & {
    margin-top: 1rem;
  }
  .input-positioner {
    display: flex;
  }
`;

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
`;

const ValidIcon = styled.div`
  font-size: 1.2rem;
  .valid {
    color: green;
  }
  .hide {
    display: none;
  }
  .invalid {
    color: red;
  }
`;

const Instruction = styled.div`
  display: flex;
  align-items: center;
  .instruction {
    color: red;
    font-size: 0.8rem;
    margin-top: 1rem;
    margin-bottom: 0.8rem;
  }
  .offscreen {
    position: absolute;
    left: -9999px;
  }
`;

const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
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

const ErrMsg = styled.span`
  .errmsg {
    background-color: lightpink;
    color: firebrick;
    font-weight: bold;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .offscreen {
    position: absolute;
    left: -9999px;
  }
`;

const RadioWrapper = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  color: 1px solid ${({ theme }) => theme.palette.gray[1]};

  label {
    margin-right: 1rem;
    color: ${({ theme }) => theme.palette.gray[6]};
    &:hover {
      color: ${({ theme }) => theme.palette.gray[9]};
    }
  }

  input[type='radio']:checked + label {
    color: ${({ theme }) => theme.palette.gray[9]};
  }
`;
