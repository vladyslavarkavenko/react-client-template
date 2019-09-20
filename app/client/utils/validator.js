import validator from 'validator';

// Common
export function validateEmail(value) {
  return validator.isEmail(value);
}

export function validateURL(value) {
  return validator.isURL(value);
}

export function validatePhone(value) {
  return validator.isMobilePhone(value);
}

// User
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

// Company
export function validateCompanyName(value) {
  return validator.isLength(value, { min: 2, max: 256 });
}

export function validateCompanyTitle(value) {
  return validator.isLength(value, { min: 2, max: 60 });
}

export function validateCompanyAbout(value) {
  return validator.isLength(value, { min: 2, max: 256 });
}
