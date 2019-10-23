import React from 'react';
import i18next from 'i18next';
import { connect } from 'react-redux';

import routing from '../../utils/routing';
import { validateUserSignUp } from '../../utils/validator';
import TextInput from '../../components/ui-components/Form/TextInput';
import PasswordInput from '../../components/PasswordInput';
import { pushSignUp } from '../../modules/auth/authActions';
import CheckboxInput from '../../components/ui-components/Form/CheckboxInput';
import Button from '../../components/ui-components/Form/Button';
import AuthService from '../../services/auth';
import Notification from '../../utils/notifications';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: {
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        confirmPassword: '',
        policy: false
      },
      token: null,
      status: 'request',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidateToken = this.handleValidateToken.bind(this);
  }

  componentDidMount() {
    this.handleValidateToken();
  }

  onChange(e) {
    const { value, name, type, checked } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      input: {
        ...prevState.input,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  }

  handleValidateToken() {
    const {
      location: { search },
      history
    } = this.props;

    const params = new URLSearchParams(search.slice(1));
    const email = params.get('email') || '';
    const token = params.get('token');

    if (!token) {
      history.push(routing().login);
    }

    AuthService.validateSignUpToken(token)
      .then(() => {
        this.setState((prevState) => ({
          status: 'success',
          input: { ...prevState.input, email },
          token
        }));
      })
      .catch((err) => {
        Notification.error(err);
        history.push(routing().login);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { pushSignUp, history } = this.props;
    const { input, token } = this.state;
    const { errors, isValid } = validateUserSignUp(input);

    this.setState({ errors });

    if (isValid) {
      const { firstName, lastName, email, phone, password, policy } = input;

      const fields = {
        firstName,
        lastName,
        phone,
        email,
        password,
        token,
        processPersonalData: policy
      };

      pushSignUp({ input: fields, history });
    }
  }

  render() {
    const { input, errors, status } = this.state;
    const { firstName, lastName, email, phone, password, confirmPassword, policy } = input;

    const isLoading = status === 'request';

    return (
      <div className="form-page">
        <div className="container">
          <h1 className="form-page__title">{i18next.t('register.title')}</h1>
          <div className="form-wrapper">
            <form className="form" onSubmit={this.handleSubmit}>
              <TextInput
                value={firstName}
                error={errors.firstName}
                onChange={this.onChange}
                name="firstName"
                readOnly={isLoading}
                labelText={i18next.t('register.name.first')}
              />
              <TextInput
                value={lastName}
                error={errors.lastName}
                onChange={this.onChange}
                name="lastName"
                readOnly={isLoading}
                labelText={i18next.t('register.name.last')}
              />
              <TextInput
                value={email}
                error={errors.email}
                onChange={this.onChange}
                name="email"
                readOnly={isLoading}
                labelText={i18next.t('register.email')}
              />
              <TextInput
                value={phone}
                error={errors.phone}
                onChange={this.onChange}
                name="phone"
                readOnly={isLoading}
                labelText={i18next.t('register.phone')}
              />
              <PasswordInput
                showIndicator
                showTooltip
                name="password"
                value={password}
                error={errors.password}
                readOnly={isLoading}
                onChange={this.onChange}
                labelText={i18next.t('register.password')}
              />
              <PasswordInput
                name="confirmPassword"
                value={confirmPassword}
                error={errors.confirmPassword}
                readOnly={isLoading}
                onChange={this.onChange}
                labelText={i18next.t('register.confirmPassword')}
              />
              <CheckboxInput
                name="policy"
                checked={policy}
                readOnly={isLoading}
                onChange={this.onChange}
                className="policy-agreement checkbox-form"
                type="checkbox"
                error={errors.policy}
                labelText={i18next.t('register.policy')}
              />
              <div className="form__bottom">
                <Button
                  type="submit"
                  isLoading={isLoading}
                  title={i18next.t('register.buttons.signUp')}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  pushSignUp
};

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
