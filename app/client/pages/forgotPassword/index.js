import React from 'react';
import { Link } from 'react-router-dom';

import PasswordInput from '../../components/PasswordInput';
import Input from '../../components/ui-components/CustomInput';
import routing from '../../utils/routing';

// TODO: Write logic for handling that.

export default function ForgotPassword({ handleSubmitBtn }) {
  return (
    <div className="form-wrapper">
      <form action="" className="form" onSubmit={handleSubmitBtn}>
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
  );
}
