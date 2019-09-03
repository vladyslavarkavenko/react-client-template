import validator from 'validator';

export function validateEmail(value) {
  return validator.isEmail(value);
}

export function validatePassword(value) {
  return value.length;
}
