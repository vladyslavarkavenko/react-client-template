import React from 'react';
import i18next from 'i18next';

import LogIn from './login';

export default function LoginPage(props) {
  return (
    <div className="form-page">
      <div className="container">
        <h1 className="form-page__title">{i18next.t('login.title')}</h1>
        <LogIn {...props} />
      </div>
    </div>
  );
}
