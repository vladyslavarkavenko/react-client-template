import React from 'react';

import ForgotPassword from './forgotPassword';

export default function ForgotPasswordPage(props) {
  return (
    <div className="form-page">
      <div className="container">
        <h1 className="form-page__title">Create new password</h1>
        <ForgotPassword {...props} />
      </div>
    </div>
  );
}