import React from 'react';
import i18next from 'i18next';
import { Link } from 'react-router-dom';

import TextInput from '../../components/ui-components/Form/TextInput';
import routing from '../../utils/routing';
import AuthService from '../../services/auth';
import { validateUserForgotPassword } from '../../utils/validator';
import Button from '../../components/ui-components/Form/Button';
import Notification from '../../utils/notifications';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.email = React.createRef();

    this.state = {
      status: 'none',
      input: {
        email: ''
      },
      errors: {}
    };

    this.handleRecoverPassword = this.handleRecoverPassword.bind(this);
  }

  handleRecoverPassword(e) {
    e.preventDefault();
    const email = this.email.current.value;
    const { isValid, errors } = validateUserForgotPassword(email);

    if (isValid) {
      this.setState({ status: 'request' });

      AuthService.recoverEmail({ email })
        .then(() => {
          this.setState({ status: 'success', input: { email } });
        })
        .catch((err) => {
          Notification.error(err);
          this.setState({
            status: 'failure',
            errors: {
              email: 'Wrong email'
            }
          });
        });
    } else {
      this.setState({
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
          <h1 className="form-page__title">{i18next.t('forgotPassword.title')}</h1>
          <div className="form-wrapper">
            {status === 'success' ? (
              <div className="form">
                <p className="form__text text-center">
                  {i18next.t('forgotPassword.successText')}
                  <br />
                  <span className="text-bold ">{input.email}</span>
                </p>
              </div>
            ) : (
              <form onSubmit={this.handleRecoverPassword} className="form">
                <TextInput
                  type="text"
                  name="email"
                  labelText="Email"
                  error={errors.email}
                  forwardRef={this.email}
                  readOnly={isLoading}
                />
                <div className="form__bottom form__bottom-flex-a">
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    onClick={this.handleRecoverPassword}
                    title={i18next.t('forgotPassword.buttons.send')}
                  />
                  <Link to={routing().login} className="button form__cancel-btn">
                    {i18next.t('forgotPassword.buttons.cancel')}
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}
