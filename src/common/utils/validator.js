import validator from 'validator';

// TODO: Make right validation.

export function validateEmail(value) {
  return validator.isEmail(value);
}

export function validatePassword(value) {
  return value.length;
}

export function validateFirstName(value) {
  return value.length;
}

export function validateLastName(value) {
  return value.length;
}

export function validatePhone(value) {
  return value.length;
}
