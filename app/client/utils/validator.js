import i18next from 'i18next';
import validator from 'validator';

// Helpers
function validateText({ value, min = 2, max }) {
  return validator.isLength(value, { min, max });
}

function validate(validators, data, keys) {
  let errors = {};
  console.log(validators, data, keys);
  keys.forEach((key) => {
    console.log(key);
    const value = data[key];
    const validFn = validators[key];

    errors = { ...errors, ...validFn(value) };
  });

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
}

// Common
function validateEmail(value, messages = {}) {
  const limit = {
    min: 2,
    max: 256
  };

  const {
    info = i18next.t('validation.email.info'),
    length = i18next.t('validation.email.length', limit),
    required = i18next.t('validation.email.required')
  } = messages;

  const errors = {};

  if (!value) {
    errors.email = required;
  } else if (!validateText({ value, ...limit })) {
    errors.email = length;
  } else if (!validator.isEmail(value)) {
    errors.email = info;
  }

  return errors;
}
function validatePhone(value, messages = {}) {
  const allowedSymbols = [...'+-–−—(),'];

  const {
    format = i18next.t('validation.phone.format')
    // required = i18next.t('validation.phone.required')
  } = messages;

  const errors = {};

  // if (value && !validator.isMobilePhone(value)) {
  //   errors.phone = format;
  // }
  if (value) {
    [...value].forEach((chr, i, arr) => {
      const isNumber = !Number.isNaN(+chr);
      const isSymbol = allowedSymbols.indexOf(chr) !== -1;
      const isPrevSymbol = allowedSymbols.indexOf(arr[i - 1]) !== -1;

      if (!(isNumber || (isSymbol && !isPrevSymbol))) {
        errors.phone = format;
      }
    });
  }

  return errors;
}
function validateLocation(value, messages = {}) {
  const limit = {
    min: 2,
    max: 256
  };

  const {
    // required = i18next.t('validation.location.required'),
    length = i18next.t('validation.location.length', limit)
  } = messages;

  const errors = {};

  if (value && !validateText({ value, ...limit })) {
    errors.location = length;
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
    required = i18next.t('validation.company.name.required'),
    length = i18next.t('validation.company.name.length', limit)
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

  if (!value) {
    errors.web = required;
  } else if (!validator.isURL(value, { require_protocol: true })) {
    errors.web = format;
  }

  return errors;
}
function validateCompanyAbout(value, messages = {}) {
  const limit = {
    min: 2,
    max: 3500
  };

  const {
    length = i18next.t('validation.company.about.length', limit)
    // required = i18next.t('validation.company.about.required')
  } = messages;

  const errors = {};

  if (value && !validateText({ value, ...limit })) {
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

  const lowerCaseUsed = /[a-z]/.test(password);
  const upperCaseUsed = /[A-Z]/.test(password);
  const specSymbolsUsed = /[0-9!@#$%^&*.]/.test(password);

  if (!password) {
    errors.password = required;
  } else if (!validateText({ value: password, ...limit })) {
    errors.password = length;
  } else if (!lowerCaseUsed || !upperCaseUsed || !specSymbolsUsed) {
    errors.password = info;
  }

  // if confirmPassword exist
  if (typeof confirmPassword === 'string') {
    if (!confirmPassword.length) {
      errors.confirmPassword = required;
    } else if (confirmPassword !== password) {
      errors.confirmPassword = match;
    }
  }

  return errors;
}
function validateUserAbout(value, messages = {}) {
  const limit = {
    min: 2,
    max: 3500
  };

  const {
    length = i18next.t('validation.user.about.length', limit)
    // required = i18next.t('validation.user.about.required')
  } = messages;

  const errors = {};

  if (value && !validateText({ value, ...limit })) {
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

function validateSelectedRoles(data, messages = {}) {
  const { roles, isMultiple } = data;
  const { required = 'Select role', length = 'Multiple roles not allowed' } = messages;

  const errors = {};

  if (!roles.length) {
    errors.role = required;
  } else if (!isMultiple && roles.length > 1) {
    errors.role = length;
  }

  return errors;
}

function validateSelectedManager(manager, messages = {}) {
  const { required = 'Select manager' } = messages;

  const errors = {};

  if (!manager) {
    errors.manager = required;
  }

  return errors;
}

// External validators
const companyValidators = {
  avatar: () => ({}),
  email: validateEmail,
  phone: validatePhone,
  web: validateCompanySite,
  name: validateCompanyName,
  about: validateCompanyAbout,
  title: validateCompanyTitle
};
export function validateCompany(data, keys = Object.keys(companyValidators)) {
  return validate(companyValidators, data, keys);
}

const userValidators = {
  avatar: () => ({}),
  email: validateEmail,
  phone: validatePhone,
  about: validateUserAbout,
  title: validateUserTitle,
  location: validateLocation,
  lastName: validateUserLastName,
  firstName: validateUserFirstName
};
export function validateUser(data, keys = Object.keys(userValidators)) {
  return validate(userValidators, data, keys);
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
  const { email, phone, firstName, lastName, password, confirmPassword, policy } = data;

  const errors = {
    ...validateEmail(email),
    ...validatePhone(phone),
    ...validateUserPolicy(policy),
    ...validateUserLastName(lastName),
    ...validateUserFirstName(firstName),
    ...validatePassword({ password, confirmPassword })
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

export function validateInviteStaffRow(rows, multipleRoles) {
  const errors = {};

  rows.forEach(({ email, firstName, lastName, roles, id }) => {
    const rowErrors = {
      ...validateEmail(email),
      ...validateUserFirstName(firstName),
      ...validateUserLastName(lastName),
      ...validateSelectedRoles({ roles, isMultiple: multipleRoles })
    };

    if (Object.keys(rowErrors).length) {
      errors[id] = rowErrors;
    }
  });

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
}

export function validateUpdateStaffRow(rows, multipleRoles) {
  const errors = {};

  rows.forEach(({ roles, id }) => {
    const rowErrors = {
      ...validateSelectedRoles({ roles, isMultiple: multipleRoles })
    };

    if (Object.keys(rowErrors).length) {
      errors[id] = rowErrors;
    }
  });

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
}

export function validateInviteCustomerRow(rows) {
  const errors = {};

  rows.forEach(({ email, firstName, lastName, manager, id, _changes = {} }) => {
    const rowErrors = {
      ...validateEmail(_changes.email || email),
      ...validateUserFirstName(_changes.firstName || firstName),
      ...validateUserLastName(_changes.lastName || lastName),
      ...validateSelectedManager(_changes.manager || manager)
    };

    if (Object.keys(rowErrors).length) {
      errors[id] = rowErrors;
    }
  });

  return {
    errors,
    isValid: !Object.keys(errors).length
  };
}
