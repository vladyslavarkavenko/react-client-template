import React from 'react';
import i18next from 'i18next';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { validateEmail, validatePassword } from '../../utils/validator';
import TextInput from '../../components/ui-components/Form/TextInput';
import PasswordInput from '../../components/PasswordInput';
import routing from '../../utils/routing';
import { pushLogin } from '../../modules/auth/authActions';
import authSelectors from '../../modules/auth/authSelectors';
// import Button from '../../components/ui-components/Form/Button';

const initialErrorsState = {
  emailError: null,
  passwordError: null
};

// TODO: Remove errors when user starts typing in that field. (Think about it)

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      ...initialErrorsState
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

    const { pushLogin, status } = this.props;

    if (status === 'request') {
      return;
    }

    this.setState({ ...initialErrorsState });

    const { email, password } = this.state;

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      pushLogin({ email, password });

      // login({ email, password }, err => (
      //   err
      //     ? displayError(err)
      //     : history.push(routing().profile)
      // ));
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
    const { status } = this.props;
    const { email, password, emailError, passwordError } = this.state;

    const isDisabled = status === 'request';

    return (
      <div className="form-page">
        <div className="container">
          <h1 className="form-page__title">{i18next.t('login.title')}</h1>
          <div className="form-wrapper">
            <form className="form" onSubmit={this.handleSubmit}>
              <TextInput
                name="email"
                value={email}
                onChange={this.onChange}
                error={emailError}
                labelText={i18next.t('login.email')}
                readOnly={isDisabled}
              />
              <PasswordInput
                value={password}
                name="password"
                onChange={this.onChange}
                error={passwordError}
                labelText={i18next.t('login.password')}
                readOnly={isDisabled}
              />
              <div className="form__bottom">
                {/*<Button*/}
                {/*  type="submit"*/}
                {/*  disabled={isDisabled}*/}
                {/*  isLoading={isDisabled}*/}
                {/*  title={i18next.t('login.buttons.login')}*/}
                {/*/>*/}
                <button type="submit" className="button form__submit-btn" disabled={isDisabled}>
                  {isDisabled ? i18next.t('default.loading') : i18next.t('login.buttons.login')}
                </button>
              </div>
            </form>
            <div className="text-center">
              <Link to={routing().forgotPassword}>{i18next.t('login.forgotPassword')}</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  status: authSelectors.status(state)
});

const mapDispatchToProps = {
  pushLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
