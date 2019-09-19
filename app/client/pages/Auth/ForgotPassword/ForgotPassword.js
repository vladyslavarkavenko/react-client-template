import React from 'react';
import { Link } from 'react-router-dom';

import TextInput from '../../../components/ui-components/Form/TextInput';
import routing from '../../../utils/routing';
import AuthService from '../../../services/auth';
import ForgotPasswordValidation from './ForgotPasswordValidation';

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
    const { isValid, errors } = ForgotPasswordValidation(email);

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

    return (
      <div className="form-page">
        <div className="container">
          <h1 className="form-page__title">Reset password</h1>
          <div className="form-wrapper">
            {status === 'success' ? (
              <div className="form">
                <p className="form__text text-center">
                  Email with reset link has been sent to:
                  <br />
                  <span className="text-bold ">{input.email}</span>
                </p>
                <Link to={routing().login} className="button form__submit-btn my-3">
                  Login
                </Link>
              </div>
            ) : (
              <form onSubmit={this.handleRecoverPassword} className="form">
                <TextInput
                  type="text"
                  name="email"
                  labelText="Email"
                  error={errors.email}
                  forwardRef={this.email}
                />
                <div className="form__bottom form__bottom-flex-a">
                  <button
                    type="button"
                    onClick={this.handleRecoverPassword}
                    className="button form__submit-btn"
                    disabled={status === 'request'}
                  >
                    Send
                  </button>
                  <Link to={routing().login} className="button form__cancel-btn">
                    Cancel
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
