import validator from 'validator';

export function validateEmail(value) {
  return validator.isEmail(value);
}

export function validatePassword(value) {
  const isLengthValid = value && value.length >= 8;
  const lowerCaseUsed = /[a-z]/.test(value);
  const upperCaseUsed = /[A-Z]/.test(value);
  const specSymbolsUsed = /[0-9!@#$%^&*.]/.test(value);

  return isLengthValid && lowerCaseUsed && upperCaseUsed && specSymbolsUsed;
}

export function validateFirstName(value) {
  return validator.isLength(value, { min: 2, max: 30 });
}

export function validateLastName(value) {
  return validator.isLength(value, { min: 2, max: 150 });
}

export function validatePhone(value) {
  return validator.isMobilePhone(value);
}
