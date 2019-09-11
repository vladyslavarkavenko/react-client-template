import React from 'react';
import i18next from 'i18next';
import { connect } from 'react-redux';
import queryString from 'query-string';

import Input from '../../components/ui-components/CustomInput';
import NewPasswordInput from '../../components/NewPasswordInput';
import {
  validateEmail,
  validatePassword,
  validateFirstName,
  validateLastName,
  validatePhone,
} from '../../utils/validator';
import { register } from '../../modules/auth';
import displayError from '../../utils/displayError';


const initialErrorsState = {
  errorFirstName: '',
  errorLastName: '',
  errorEmail: '',
  errorPhone: '',
  errorPassword: '',
  errorPolicy: false,
};

// TODO: Fix ssr (double loading).

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      policy: false,
      token: null,
      ...initialErrorsState,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      location: {
        search,
      },
      history,
    } = this.props;
    const { token, email } = queryString.parse(search);

    const newState = {};
    if (token) {
      newState.token = token;
    } else {
      return history.push('/404');
    }
    if (email) {
      newState.email = email;
    }

    return this.setState(newState);
  }

  onChange(e) {
    const {
      value, name, type, checked,
    } = e.target;

    this.setState({ [name]: type === 'checkbox' ? checked : value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ ...initialErrorsState });

    const { register, history } = this.props;
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      policy,
      token,
    } = this.state;

    const isFirstNameValid = validateFirstName(firstName);
    const isLastNameValid = validateLastName(lastName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isPhoneValid = validatePhone(phone);

    if (
      isEmailValid
      && isPasswordValid
      && isFirstNameValid
      && isLastNameValid
      && isPhoneValid
      && policy
    ) {
      const data = {
        firstName,
        lastName,
        phone,
        email,
        password,
        token,
      };

      register(data, err => (
        err
          ? displayError(err)
          : history.push('/')
      ));
    } else {
      const newState = {};

      if (!isEmailValid) {
        newState.errorEmail = i18next.t('errors.email');
      }
      if (!isPasswordValid) {
        newState.errorPassword = i18next.t('errors.password');
      }
      if (!isFirstNameValid) {
        newState.errorFirstName = i18next.t('errors.name.first');
      }
      if (!isLastNameValid) {
        newState.errorLastName = i18next.t('errors.name.last');
      }
      if (!isPhoneValid) {
        newState.errorPhone = i18next.t('errors.phone');
      }
      if (!policy) {
        newState.errorPolicy = true;
      }

      this.setState(newState);
    }
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      policy,
      errorFirstName,
      errorLastName,
      errorEmail,
      errorPhone,
      errorPassword,
      errorPolicy,
    } = this.state;

    return (
      <div className="form-wrapper">
        <form className="form" onSubmit={this.handleSubmit}>
          <Input
            value={firstName}
            error={errorFirstName}
            onChange={this.onChange}
            name="firstName"
            labelText={i18next.t('register.name.first')}
          />
          <Input
            value={lastName}
            error={errorLastName}
            onChange={this.onChange}
            name="lastName"
            labelText={i18next.t('register.name.last')}
          />
          <Input
            value={email}
            error={errorEmail}
            onChange={this.onChange}
            name="email"
            labelText={i18next.t('register.email')}
          />
          <Input
            value={phone}
            error={errorPhone}
            onChange={this.onChange}
            name="phone"
            labelText={i18next.t('register.phone')}
          />
          <NewPasswordInput
            value={password}
            error={errorPassword}
            onChange={this.onChange}
          />
          <div className={`policy-agreement ${errorPolicy ? 'checkbox-error' : ''}`}>
            <input
              name="policy"
              checked={policy}
              onChange={this.onChange}
              type="checkbox"
              id="policy"
            />
            <label htmlFor="policy">
              {i18next.t('register.policy')}
            </label>
          </div>
          <div className="form__bottom">
            <button
              type="submit"
              className="button form__submit-btn"
            >
              {i18next.t('register.buttons.signUp')}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { register })(SignUp);
