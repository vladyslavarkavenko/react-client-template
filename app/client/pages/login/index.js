import React from 'react';
import i18next from 'i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { login } from '../../modules/auth';
import Input from '../../components/ui-components/CustomInput';
import PasswordInput from '../../components/PasswordInput';
import { validateEmail, validatePassword } from '../../utils/validator';
import displayError from '../../utils/displayError';

const initialErrorsState = {
  emailError: null,
  passwordError: null,
};

// TODO: Remove errors when user starts typing in that field. (Think about it)

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      ...initialErrorsState,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ ...initialErrorsState });

    const { login, history } = this.props;
    const { email, password } = this.state;

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      login({ email, password }, err => (
        err
          ? displayError(err)
          : history.push('/')
      ));
    } else {
      const newState = {};

      if (!isEmailValid) {
        newState.emailError = i18next.t('errors.email');
      }
      if (!isPasswordValid) {
        newState.passwordError = i18next.t('errors.pass');
      }

      this.setState(newState);
    }
  }

  render() {
    const {
      email,
      password,
      emailError,
      passwordError,
    } = this.state;

    return (
      <div className="form-wrapper">
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <Input
            name="email"
            value={email}
            onChange={this.onChange}
            error={emailError}
            labelText={i18next.t('login.email')}
          />
          <PasswordInput
            value={password}
            onChange={this.onChange}
            error={passwordError}
            labelText={i18next.t('login.password')}
          />
          <div className="form__bottom">
            <button
              type="submit"
              className="button form__submit-btn"
            >
              {i18next.t('login.buttons.login')}
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/forgot-password">
            {i18next.t('login.forgotPassword')}
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(null, { login })(LogIn);
