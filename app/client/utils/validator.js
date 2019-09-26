import i18next from 'i18next';
import validator from 'validator';

// Helpers
function validateText({ value, min = 2, max }) {
  return validator.isLength(value, { min, max });
}

// Common
function validateEmail(value, messages = {}) {
  const {
    info = i18next.t('validation.email.info'),
    long = i18next.t('validation.email.long'),
    required = i18next.t('validation.email.required')
  } = messages;

  const errors = {};

  if (!value.length) {
    errors.email = required;
  } else if (!validateText({ value, max: 30 })) {
    errors.email = long;
  } else if (!validator.isEmail(value)) {
    errors.email = info;
  }

  return errors;
}
function validatePhone(value, messages = {}) {
  const {
    format = i18next.t('validation.phone.format'),
    required = i18next.t('validation.phone.required')
  } = messages;

  const errors = {};

  if (!value) {
    errors.phone = required;
  } else if (!validator.isMobilePhone(value)) {
    errors.phone = format;
  }

  return errors;
}
function validateLocation(value, messages = {}) {
  // TODO: Need improvements.
  const { required = i18next.t('validation.location.required') } = messages;

  const errors = {};

  if (!value) {
    errors.location = required;
  }

  return errors;
}

// Company
function validateCompanyName(value, messages = {}) {
  const limit = {
    min: 2,
    max: 256
  };

  const {
    length = i18next.t('validation.company.name.length', limit),
    required = i18next.t('validation.company.name.required')
  } = messages;

  const errors = {};

  if (!value) {
    errors.name = required;
  } else if (!validateText({ value, ...limit })) {
    errors.name = length;
  }

  return errors;
}
function validateCompanySite(value, messages = {}) {
  const {
    format = i18next.t('validation.company.web.format'),
    required = i18next.t('validation.company.web.required')
  } = messages;

  const errors = {};

  if (!value.length) {
    errors.web = required;
  } else if (!validator.isURL(value, { require_protocol: true })) {
    errors.web = format;
  }

  return errors;
}
function validateCompanyAbout(value, messages = {}) {
  const limit = {
    min: 2,
    max: 256
  };

  const {
    length = i18next.t('validation.company.about.length', limit),
    required = i18next.t('validation.company.about.required')
  } = messages;

  const errors = {};

  if (!value) {
    errors.about = required;
  } else if (!validateText({ value, ...limit })) {
    errors.about = length;
  }

  return errors;
}
function validateCompanyTitle(value, messages = {}) {
  const limit = {
    min: 2,
    max: 60
  };

  const { length = i18next.t('validation.company.title.length', limit) } = messages;

  const errors = {};

  if (value && !validateText({ value, ...limit })) {
    errors.title = length;
  }

  return errors;
}

// User
function validatePassword(value, messages = {}) {
  const limit = { min: 8 };
  const { password, confirmPassword } = value;

  const {
    info = i18next.t('validation.user.password.info'),
    match = i18next.t('validation.user.password.match'),
    length = i18next.t('validation.user.password.length', limit),
    required = i18next.t('validation.user.password.required')
  } = messages;

  const errors = {};

  if (!password.length) {
    errors.password = required;
  }

  if (!validateText({ value: password, ...limit })) {
    errors.password = length;
  }

  const lowerCaseUsed = /[a-z]/.test(password);
  const upperCaseUsed = /[A-Z]/.test(password);
  const specSymbolsUsed = /[0-9!@#$%^&*.]/.test(password);

  if (!lowerCaseUsed || !upperCaseUsed || !specSymbolsUsed) {
    errors.password = info;
  }

  // if confirmPassword exist
  if (typeof confirmPassword === 'string') {
    if (!confirmPassword.length) {
      errors.confirmPassword = required;
      return errors;
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = match;
    }
  }

  return errors;
}
function validateUserAbout(value, messages = {}) {
  const limit = {
    min: 2,
    max: 256
  };

  const {
    length = i18next.t('validation.user.about.length', limit),
    required = i18next.t('validation.user.about.required')
  } = messages;

  const errors = {};

  if (!value) {
    errors.about = required;
  } else if (!validateText({ value, ...limit })) {
    errors.about = length;
  }

  return errors;
}
function validateUserTitle(value, messages = {}) {
  const limit = {
    min: 2,
    max: 60
  };

  const { length = i18next.t('validation.user.title.length', limit) } = messages;

  const errors = {};

  if (value && !validateText({ value, ...limit })) {
    errors.title = length;
  }

  return errors;
}
function validateUserPolicy(value, messages = {}) {
  const { required = i18next.t('validation.user.policy.required') } = messages;

  const errors = {};

  if (!value) {
    errors.policy = required;
  }

  return errors;
}
function validateUserLastName(value, messages = {}) {
  const limit = {
    min: 2,
    max: 256
  };

  const {
    length = i18next.t('validation.user.lastName.length', limit),
    required = i18next.t('validation.user.lastName.required')
  } = messages;

  const errors = {};

  if (!value) {
    errors.lastName = required;
  } else if (!validateText({ value, ...limit })) {
    errors.lastName = length;
  }

  return errors;
}
function validateUserFirstName(value, messages = {}) {
  const limit = {
    min: 2,
    max: 256
  };

  const {
    length = i18next.t('validation.user.firstName.length', limit),
    required = i18next.t('validation.user.firstName.required')
  } = messages;

  const errors = {};

  if (!value) {
    errors.firstName = required;
  } else if (!validateText({ value, ...limit })) {
    errors.firstName = length;
  }

  return errors;
}

function validateUserSubjectOrTopic(data, messages = {}) {
  const { list = [], title, field = 'subject' } = data;

  const limit = {
    min: 2,
    max: 120
  };

  const {
    length = i18next.t('validation.default.length', { ...limit, field }),
    required = i18next.t('validation.default.required', { ...limit, field }),
    exist = i18next.t(`validation.${field}.exist`, limit)
  } = messages;

  const errors = {};

  if (!title) {
    errors[field] = required;
  } else if (!validateText({ value: title, ...limit })) {
    errors[field] = length;
  } else if (list.includes(title)) {
    errors[field] = exist;
  }

  return errors;
}

// External validators
export function validateUser(data) {
  const { email, phone, about, firstName, lastName, title, location } = data;

  const errors = {
    ...validateUserAbout(about),
    ...validateUserTitle(title),
    ...validateEmail(email),
    ...validatePhone(phone),
    ...validateLocation(location),
    ...validateUserLastName(lastName),
    ...validateUserFirstName(firstName)
  };

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
}
export function validateCompany(data) {
  const { email, name, phone, web, about, title } = data;

  const errors = {
    ...validateCompanySite(web),
    ...validateEmail(email),
    ...validatePhone(phone),
    ...validateCompanyName(name),
    ...validateCompanyAbout(about),
    ...validateCompanyTitle(title)
  };

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
}
export function validateUserLogin(data) {
  const { email, password } = data;

  const errors = {
    ...validateEmail(email),
    ...validatePassword({ password })
  };

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
}
export function validateUserSignUp(data) {
  const { email, phone, firstName, lastName, password, policy } = data;

  const errors = {
    ...validateEmail(email),
    ...validatePhone(phone),
    ...validateUserPolicy(policy),
    ...validateUserLastName(lastName),
    ...validateUserFirstName(firstName),
    ...validatePassword({ password })
  };

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
}
export function validateUserResetPassword(data) {
  const errors = {
    ...validatePassword(data)
  };

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
}
export function validateUserForgotPassword(data) {
  const errors = {
    ...validateEmail(data)
  };

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
}

export function validateCreateNewTopic(data) {
  const { subject, topic, subjectList, topicList } = data;

  const errors = {
    ...validateUserSubjectOrTopic({
      field: 'subject',
      list: subjectList,
      title: subject
    }),
    ...validateUserSubjectOrTopic({
      field: 'topic',
      list: topicList,
      title: topic
    })
  };

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
}
