import validator from 'validator';
import i18next from 'i18next';

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

export function validateText({ value, min, max }) {
  return validator.isLength(value, { min, max });
}

export function getEmailValidation(email, messages = {}) {
  const {
    required = i18next.t('validation.email.required'),
    info = i18next.t('validation.email.info'),
    long = i18next.t('validation.email.long')
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
    required = i18next.t('validation.email.required'),
    info = i18next.t('validation.email.info'),
    match = i18next.t('validation.email.match')
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
