// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { changeField, initializeForm, register } from '../../modules/auth';
// import { check } from '../../modules/user';
// import { useNavigate } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useInputs from '../../lib/hooks/useInputs';
import AuthForm from './AuthForm';
import { isEmail, isPart, isPassword, isName } from '../../lib/utils/validator';

function useFormCheck(prevState: string) {
  const [bool, setBool] = useState(false);
  useEffect(() => {
    if (prevState !== '') {
      setBool(true);
    } else {
      setBool(false);
    }
  }, [prevState]);
  return bool;
}

function validateAuthForm(payload: any) {
  if (!isPassword(payload.password)) {
    window.alert('비밀번호는 8자 이상의 영문과 숫자 조합이어야 합니다.');
    return false;
  } else if (!isName(payload.username)) {
    window.alert('이름은 한글 혹은 영문이어야 합니다.');
    return false;
  } else if (!isPart(payload.part)) {
    window.alert('파트를 선택하세요.');
    return false;
  } else {
    return true;
  }
}

function RegisterForm() {
  const navigate = useNavigate();
  const [{ userEmail, userName, userPassword }, handleInputsChange, reset] =
    useInputs({
      userEmail: '',
      userName: '',
      userPassword: '',
    });
  const [isUserEmailValid, setIsUserEmailValid] = useState(true);
  const [userPart, setUserPart] = useState('');

  function handleRadio(e: any) {
    setUserPart(e.target.value);
  }

  const formCheck3 = useFormCheck(userPassword);
  const formCheck4 = useFormCheck(userPart);

  function handleAuthFormSubmit(e: any) {
    e.preventDefault();
    const payload = {
      userEmail: userEmail,
      userName: userName,
      userPassword: userPassword,
      userPart: userPart,
    };
    if (validateAuthForm(payload)) {
      navigate(`vote/${userPart}`);
    }
  }

  return (
    <AuthForm
      type="register"
      userEmail={userEmail}
      userName={userName}
      userPassword={userPassword}
      userPart={userPart}
      handleInputsChange={handleInputsChange}
      handleAuthFormSubmit={handleAuthFormSubmit}
      handleRadio={handleRadio}
      // error={error}
    />
  );
}

export default RegisterForm;

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
