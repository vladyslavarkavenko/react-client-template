import React from 'react';
import i18next from 'i18next';

import SignUp from './register';

export default function Register(props) {
  return (
    <div className="form-page">
      <div className="container">
        <h1 className="form-page__title">{i18next.t('register.title')}</h1>
        <SignUp {...props} />
      </div>
    </div>
  );
}
