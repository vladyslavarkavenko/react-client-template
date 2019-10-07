import React from 'react';
import i18next from 'i18next';
import queryString from 'query-string';
import { connect } from 'react-redux';
import routing from '../../utils/routing';
import { validateUserSignUp } from '../../utils/validator';
import TextInput from '../../components/ui-components/Form/TextInput';
import PasswordInput from '../../components/PasswordInput';
import { pushSignUp } from '../../modules/auth/authActions';
import CheckboxInput from '../../components/ui-components/Form/CheckboxInput';
import Button from '../../components/ui-components/Form/Button';

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
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      location: { search },
      history
    } = this.props;
    const { token, email } = queryString.parse(search);

    const newState = {};
    if (token) {
      newState.token = token;
    } else {
      return history.push(routing().notFound);
    }
    if (email) {
      newState.email = email;
    }

    return this.setState(newState);
  }

  onChange(e) {
    const { value, name, type, checked } = e.target;

    this.setState({ [name]: type === 'checkbox' ? checked : value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { pushSignUp, history } = this.props;
    const { errors, isValid } = validateUserSignUp(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    const { firstName, lastName, email, phone, password, token } = this.state;
    const input = { firstName, lastName, phone, email, password, token };

    return pushSignUp({ input, history });
  }

  render() {
    const { firstName, lastName, email, phone, password, policy, errors } = this.state;

    //TODO: add confirm password field

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
                labelText={i18next.t('register.name.first')}
              />
              <TextInput
                value={lastName}
                error={errors.lLastName}
                onChange={this.onChange}
                name="lastName"
                labelText={i18next.t('register.name.last')}
              />
              <TextInput
                value={email}
                error={errors.email}
                onChange={this.onChange}
                name="email"
                labelText={i18next.t('register.email')}
              />
              <TextInput
                value={phone}
                error={errors.phone}
                onChange={this.onChange}
                name="phone"
                labelText={i18next.t('register.phone')}
              />
              <PasswordInput
                showIndicator
                showTooltip
                name="password"
                value={password}
                error={errors.password}
                onChange={this.onChange}
                labelText={i18next.t('register.password')}
              />
              <CheckboxInput
                name="policy"
                checked={policy}
                onChange={this.onChange}
                className="policy-agreement checkbox-form"
                type="checkbox"
                error={errors.policy}
                labelText={i18next.t('register.policy')}
              />
              <div className="form__bottom">
                <Button type="submit" title={i18next.t('register.buttons.signUp')} />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  history: props.history,
  location: props.location
});

const mapDispatchToProps = {
  pushSignUp
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
