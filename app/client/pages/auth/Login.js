import React from 'react';
import i18next from 'i18next';

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { validateUserLogin } from '../../utils/validator';
import TextInput from '../../components/ui-components/Form/TextInput';
import PasswordInput from '../../components/PasswordInput';
import routing from '../../utils/routing';
import { pushLogin } from '../../modules/auth/authActions';
import authSelectors from '../../modules/auth/authSelectors';
import Button from '../../components/ui-components/Form/Button';

// TODO: Remove errors when user starts typing in that field. (Think about it)

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
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
      return null;
    }

    const { errors, isValid } = validateUserLogin(this.state);
    if (!isValid) {
      return this.setState({ errors });
    }

    const { email, password } = this.state;
    return pushLogin({ email, password });
  }

  render() {
    const { status, isAuth } = this.props;
    const { email, password, errors } = this.state;

    if (isAuth) {
      return <Redirect to="/" />;
    }

    const isLoading = status === 'request';

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
                error={errors.email}
                labelText={i18next.t('login.email')}
                readOnly={isLoading}
              />
              <PasswordInput
                value={password}
                name="password"
                onChange={this.onChange}
                error={errors.password}
                labelText={i18next.t('login.password')}
                readOnly={isLoading}
              />
              <div className="form__bottom">
                <Button
                  type="submit"
                  isLoading={isLoading}
                  title={i18next.t('login.buttons.login')}
                />
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
  status: authSelectors.status(state),
  isAuth: authSelectors.isAuth(state)
});

const mapDispatchToProps = {
  pushLogin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
