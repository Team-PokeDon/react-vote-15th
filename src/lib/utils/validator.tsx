import { API } from '../api/axiosConfig';

// export async function emailDuplicateCheck(input: string) {
//   return new Promise((resolve, reject) => {
//     API.post('/duplicate/email', { email: input }).then((res) => {
//       if (res.status === 200) {
//         return resolve(res.data);
//       } else {
//         return reject(false);
//       }
//     });
//   });
// }

// export async function userNameDuplicateCheck(input: string) {
//   return new Promise((resolve, reject) => {
//     API.post('/duplicate/username', { username: input }).then((res) => {
//       if (res.status === 200) {
//         return resolve(res.data);
//       } else {
//         return reject(false);
//       }
//     });
//   });
// }

export function isValidEmail(asValue: string) {
  var regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  if (!regExp.test(asValue)) {
    window.alert('올바른 이메일 형식이 아닙니다.');
    return false;
  }
  return true;
}

export function isValidPassword(asValue: string) {
  var regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!regExp.test(asValue)) {
    window.alert('이름은 한글 혹은 영문이어야 합니다.');
    return false;
  }
  return true;
}

export function isValidName(asValue: string) {
  var regExp = /^[가-힣a-zA-Z]+$/;
  if (!regExp.test(asValue)) {
    window.alert('비밀번호는 8자 이상의 영문과 숫자 조합이어야 합니다.');
    return false;
  }
  return true;
}

export function isValidPart(asValue: string) {
  if (asValue === 'frontend' || asValue === 'backend') return true;
  window.alert('파트를 선택하세요.');
  return false;
}
