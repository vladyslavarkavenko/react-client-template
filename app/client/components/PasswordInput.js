import React from 'react';
import i18next from 'i18next';

import SvgEye from '../../../public/assets/svg/eye.svg';
import SvgSlashEye from '../../../public/assets/svg/eye-slash.svg';

import PasswordIndicator from './ui-components/Form/PasswordIndicator';

class PasswordInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPasswordVisible: false
    };

    this.togglePassword = this.togglePassword.bind(this);
  }

  togglePassword() {
    this.setState((state) => ({
      isPasswordVisible: !state.isPasswordVisible
    }));
  }

  render() {
    const {
      name = 'password',
      value,
      onChange,
      error,
      labelText,
      showIndicator,
      showTooltip,
      readOnly,
      forwardRef
    } = this.props;
    const { isPasswordVisible } = this.state;

    const key = `${name}_pass`;
    // TODO: Rewrite this using CustomInput.js

    return (
      <div className="form__row">
        <div className={`input-block ${error ? 'input-error' : ''}`}>
          {error && <span className="input-error-message">{error}</span>}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor={key} className="form__row-label">
            {labelText}
            {showIndicator && <PasswordIndicator value={value} />}
          </label>
          <div className="p-relative">
            <input
              id={key}
              name={name}
              onChange={onChange}
              value={value}
              type={isPasswordVisible ? 'text' : 'password'}
              className="form__row-input"
              readOnly={readOnly}
              ref={forwardRef}
            />
            <button
              className="toggle-password-visibility"
              type="button"
              onClick={this.togglePassword}
            >
              {isPasswordVisible ? <SvgEye /> : <SvgSlashEye />}
            </button>
          </div>
        </div>
        {showTooltip && (
          <span className="form__row-tooltip">{i18next.t('register.passwordNote')}</span>
        )}
      </div>
    );
  }
}

export default PasswordInput;
