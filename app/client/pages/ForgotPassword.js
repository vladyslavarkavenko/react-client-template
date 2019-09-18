import React from 'react';

import PasswordInput from '../components/PasswordInput';
import Input from '../components/ui-components/CustomInput';
import { Link } from 'react-router-dom';
import routing from '../utils/routing';

export default function ForgotPasswordPage(props) {
  return (
    <div className="form-page">
      <div className="container">
        <h1 className="form-page__title">Create new password</h1>
        <div className="form-wrapper">
          <form action="" className="form">
            <PasswordInput />
            <Input type="password" name="password" labelText="Confirm password" />
            <div className="form__bottom form__bottom-flex-a">
              <button type="submit" className="button form__submit-btn">
                Save
              </button>
              <Link to={routing().login} className="button form__cancel-btn">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
