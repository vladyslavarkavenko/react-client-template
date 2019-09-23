import React from 'react';
import i18next from 'i18next';
import { Link } from 'react-router-dom';

import routing from '../../utils/routing';
import AuthService from '../../services/auth';
import PasswordInput from '../../components/PasswordInput';
import { validateUserResetPassword } from '../../utils/validator';
import Button from '../../components/ui-components/Form/Button';

export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: 'none', // none, false, true
      status: 'none', // request, success, failure
      input: {
        password: '',
        confirmPassword: '',
        token: ''
      },
      errors: {}
    };

    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { location, history } = this.props;
    const token = new URLSearchParams(location.search.slice(1)).get('token');

    if (!token) {
      history.push(routing().login);
    } else {
      this.setState((prevState) => ({
        ...prevState,
        input: { ...prevState.input, token }
      }));
    }
  }

  onChange({ target: { value, name } }) {
    this.setState((prevState) => ({
      ...prevState,
      input: { ...prevState.input, [name]: value }
    }));
  }

  handleChangePassword(e) {
    e.preventDefault();
    const { input } = this.state;
    const { history } = this.props;
    const { token, password } = input;

    const { isValid, errors } = validateUserResetPassword(input);

    if (isValid) {
      this.setState({ status: 'request' });

      AuthService.changePassword({ token, password })
        .then(() => {
          this.setState({ status: 'success' });

          history.push(routing().login);
        })
        .catch((err) => {
          console.error(err);
          this.setState({
            status: 'failure',
            isValid: false,
            errors: {
              server: 'Something went wrong'
            }
          });
        });
    } else {
      this.setState({
        isValid,
        errors
      });
    }
  }

  render() {
    const { errors, status, input } = this.state;

    const isLoading = status === 'request';

    return (
      <div className="form-page">
        <div className="container">
          <h1 className="form-page__title">{i18next.t('resetPassword.title')}</h1>
          <div className="form-wrapper">
            <form onSubmit={this.handleChangePassword} className="form">
              <PasswordInput
                showIndicator
                showTooltip
                name="password"
                value={input.password}
                error={errors.password}
                onChange={this.onChange}
                labelText={i18next.t('resetPassword.password')}
                readOnly={isLoading}
              />
              <PasswordInput
                name="confirmPassword"
                value={input.confirmPassword}
                error={errors.confirmPassword}
                onChange={this.onChange}
                labelText={i18next.t('resetPassword.confirmPassword')}
                readOnly={isLoading}
              />

              <div className="form__bottom form__bottom-flex-a">
                <Button
                  type="submit"
                  isLoading={isLoading}
                  onClick={this.handleChangePassword}
                  title={i18next.t('resetPassword.buttons.send')}
                />
                <Link to={routing().login} className="button form__cancel-btn">
                  {i18next.t('resetPassword.buttons.cancel')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
