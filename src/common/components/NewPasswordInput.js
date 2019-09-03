import React from 'react';
import PasswordIndicator from './newPasswordInput/PasswordIndicator';

class NewPasswordInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPasswordVisible: false,
    };

    this.togglePassword = this.togglePassword.bind(this);
  }

  togglePassword() {
    this.setState(state => ({
      isPasswordVisible: !state.isPasswordVisible,
    }));
  }

  render() {
    const { value, onChange, error } = this.props;
    const { isPasswordVisible } = this.state;

    // TODO: Rewrite this using CustomInput.js
    return (
      <div className="input-block form__row">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          htmlFor="password"
          className="form__row-label"
        >
          Password
          <PasswordIndicator value={value} />
        </label>
        {
          error
          && (
            <span className="input-error-message">
              {error}
            </span>
          )
        }
        <div className="position-relative">
          <input
            id="password"
            name="password"
            onChange={onChange}
            value={value}
            type={isPasswordVisible ? 'text' : 'password'}
            className="form__row-input"
          />
          <button
            className="toggle-password-visibility"
            type="button"
            onClick={this.togglePassword}
          >
            <i className={`fas ${isPasswordVisible ? 'fa-eye' : 'fa-eye-slash'}`}>
              &nbsp;
            </i>
          </button>
        </div>
        <span className="form__row-tooltip">
          At least 8 characters
        </span>
      </div>
    );
  }
}

export default NewPasswordInput;
