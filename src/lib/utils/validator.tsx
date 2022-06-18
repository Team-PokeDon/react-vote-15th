import API from '../api/API';

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

export function isEmail(asValue: string) {
  var regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  return regExp.test(asValue);
}

// 여섯글자 이상의 영어 소문자 혹은 숫자 조합
export function isPassword(asValue: string) {
  var regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regExp.test(asValue);
}

// 한글 혹은 영문
export function isName(asValue: string) {
  var regExp = /^[가-힣a-zA-Z]+$/;
  return regExp.test(asValue);
}

export function isPart(asValue: string) {
  if (asValue === 'frontend') return true;
  else if (asValue === 'backend') return true;
  else return false;
}
