import React from 'react';
import { Link } from 'react-router-dom';

import Input from '../../components/ui-components/CustomInput';
import { validateEmail, validatePassword } from '../../utils/validator';

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      emailError: null,
      passwordError: null,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { email, password } = this.state;

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      // send request to server
    } else {
      const newState = {};

      if (!isEmailValid) newState.emailError = 'Email error';
      if (!isPasswordValid) newState.passwordError = 'Password error';

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
            labelText="Email address"
          />
          <Input
            name="password"
            value={password}
            type="password"
            onChange={this.onChange}
            error={passwordError}
            labelText="Password"
          />
          <div className="form__bottom">
            <button
              type="submit"
              className="button form__submit-btn"
            >
              Log in
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/forgot-password">
            Forgot password?
          </Link>
        </div>
      </div>
    );
  }
}

export default LogIn;
