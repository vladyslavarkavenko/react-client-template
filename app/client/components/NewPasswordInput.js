import React from 'react';
import i18next from 'i18next';

import SvgEye from '../../../public/assets/svg/eye.svg';
import SvgSlashEye from '../../../public/assets/svg/eye-slash.svg';

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
        {
          error
          && (
            <span className="input-error-message">
              {error}
            </span>
          )
        }
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label
          htmlFor="password"
          className="form__row-label"
        >
          {i18next.t('register.password')}
          <PasswordIndicator value={value} />
        </label>
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
            {
              isPasswordVisible
                ? <SvgEye />
                : <SvgSlashEye />
            }
          </button>
        </div>
        <span className="form__row-tooltip">
          {i18next.t('register.passwordNote')}
        </span>
      </div>
    );
  }
}

export default NewPasswordInput;
