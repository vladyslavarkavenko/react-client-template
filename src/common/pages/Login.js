import React from 'react';

import LogIn from './login';

export default function LoginPage(props) {
  return (
    <div className="form-page">
      <div className="container">
        <h1 className="form-page__title">Log in to cTRU</h1>
        <LogIn {...props} />
      </div>
    </div>
  );
}
