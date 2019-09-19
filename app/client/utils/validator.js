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

export function validateText({ value, min, max }) {
  return validator.isLength(value, { min, max });
}

export function getEmailValidation(email, messages = {}) {
  const {
    required = 'Email is required',
    info = 'Write correct email',
    long = 'Email is too long'
  } = messages;

  const errors = {};

  if (!email.length) {
    errors.email = required;
    return errors;
  }

  if (!validateText({ value: email, max: 30 })) {
    errors.email = long;
    return errors;
  }

  if (!validateEmail(email)) {
    errors.email = info;
    return errors;
  }

  return errors;
}

export function getPasswordValidation(data, messages = {}) {
  // data is object -> data = {password: '1234', confirmPassword: '1234'}
  const {
    required = 'Password field is required',
    info = 'Password must be at least 8 characters long and include uppercase, lowercase letters, numbers and special symbols',
    match = "Passwords didn't match"
  } = messages;

  const errors = {};

  if (!data.password.length) {
    errors.password = required;
  }

  if (!validatePassword(data.password)) {
    errors.password = info;
  }

  // if confirmPassword exist
  if (typeof data.confirmPassword === 'string') {
    if (!data.confirmPassword.length) {
      errors.confirmPassword = required;
      return errors;
    }

    if (data.confirmPassword !== data.password) {
      errors.confirmPassword = match;
    }
  }

  return errors;
}
