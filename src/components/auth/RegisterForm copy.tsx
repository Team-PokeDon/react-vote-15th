import { useRef, useState, useEffect } from 'react';
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import axios from './api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef(null);

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   userRef.current!.focus();
  // }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // // if button enabled with JS hack
    // const v1 = USER_REGEX.test(user);
    // const v2 = PWD_REGEX.test(pwd);
    // if (!v1 || !v2) {
    //   setErrMsg('Invalid Entry');
    //   return;
    // }
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
    //   errRef.current.focus();
    // }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !pwd ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{' '}
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>

            <button
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="#">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { changeField, initializeForm, register } from '../../modules/auth';
// import { check } from '../../modules/user';
// import { useNavigate } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
// import useInputs from '../../lib/hooks/useInputs';
// import AuthForm from './AuthForm';
// import {
//   isValidEmail,
//   isValidPart,
//   isValidPassword,
//   isValidName,
// } from '../../lib/utils/validator';
// import { useAppDispatch, useAppSelector } from '../../store/app/hooks';
// import { register, selectUserData } from '../../store/auth/authSlice';

// function validateAuthForm(payload: any) {
//   if (
//     isValidEmail(payload.userEmail) &&
//     isValidName(payload.userName) &&
//     isValidPassword(payload.userPassword) &&
//     isValidPart(payload.userPart)
//   )
//     return true;
//   return false;
// }

// function RegisterForm() {
//   const navigate = useNavigate();
//   const [{ userEmail, userName, userPassword, userPart }, handleInputsChange] =
//     useInputs({
//       userEmail: '',
//       userName: '',
//       userPassword: '',
//       userPart: '',
//     });

//   // global state
//   const userData = useAppSelector(selectUserData);
//   const dispatch = useAppDispatch();

//   function handleAuthFormSubmit(e: any) {
//     e.preventDefault();
//     const payload = {
//       userEmail: userEmail,
//       userName: userName,
//       userPassword: userPassword,
//       userPart: userPart,
//     };
//     console.log(payload);
//     if (validateAuthForm(payload)) {
//       // register code goes here
//       dispatch(register(payload));
//       navigate(`/`);
//     }
//   }

//   return (
//     <AuthForm
//       type="register"
//       userEmail={userEmail}
//       userName={userName}
//       userPassword={userPassword}
//       handleInputsChange={handleInputsChange}
//       handleAuthFormSubmit={handleAuthFormSubmit}
//       // error={error}
//     />
//   );
// }

// export default RegisterForm;

// const [error, setError] = useState(null);
// const dispatch = useDispatch();
// const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
//   form: auth.register,
//   auth: auth.auth,
//   authError: auth.authError,
//   user: user.user,
// }));
// // 인풋 변경 이벤트 핸들러
// const onChange = (e) => {
//   const { value, name } = e.target;
//   dispatch(
//     changeField({
//       form: 'register',
//       key: name,
//       value,
//     }),
//   );
// };

// // 폼 등록 이벤트 핸들러
// const onSubmit = (e) => {
//   e.preventDefault();
//   const { username, password, passwordConfirm } = form;
//   // 하나라도 비어있다면
//   if ([username, password, passwordConfirm].includes('')) {
//     setError('빈 칸을 모두 입력하세요.');
//     return;
//   }
//   // 비밀번호가 일치하지 않는다면
//   if (password !== passwordConfirm) {
//     setError('비밀번호가 일치하지 않습니다.');
//     dispatch(changeField({ form: 'register', key: 'password', value: '' }));
//     dispatch(
//       changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
//     );
//     return;
//   }
//   dispatch(register({ username, password }));
// };

// // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
// useEffect(() => {
//   dispatch(initializeForm('register'));
// }, [dispatch]);

// // 회원가입 성공 / 실패 처리
// useEffect(() => {
//   if (authError) {
//     // 계정명이 이미 존재할 때
//     if (authError.response.status === 409) {
//       setError('이미 존재하는 계정명입니다.');
//       return;
//     }
//     // 기타 이유
//     setError('회원가입 실패');
//     return;
//   }

//   if (auth) {
//     console.log('회원가입 성공');
//     console.log(auth);
//     dispatch(check());
//   }
// }, [auth, authError, dispatch]);

// // user 값이 잘 설정되었는지 확인
// useEffect(() => {
//   if (user) {
//     navigate('/'); // 홈 화면으로 이동
//     try {
//       localStorage.setItem('user', JSON.stringify(user));
//     } catch (e) {
//       console.log('localStorage is not working');
//     }
//   }
// }, [navigate, user]);
