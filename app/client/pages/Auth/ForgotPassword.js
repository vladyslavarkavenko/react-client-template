import React from 'react';
import i18next from 'i18next';
import { Link } from 'react-router-dom';

import TextInput from '../../components/ui-components/Form/TextInput';
import routing from '../../utils/routing';
import AuthService from '../../services/auth';
import { validateUserForgotPassword } from '../../utils/validator';
import Button from '../../components/ui-components/Form/Button';

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.email = React.createRef();

    this.state = {
      isValid: 'none', //none, false, true
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
          console.error(err);
          this.setState({
            status: 'failure',
            isValid: false,
            errors: {
              email: 'Wrong email'
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
    const { errors, isValid, status, input } = this.state;

    console.log(isValid);

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
