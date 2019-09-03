import React from 'react';

import SignUp from './register';

export default function Register(props) {
  return (
    <div className="form-page">
      <div className="container">
        <h1 className="form-page__title">Sign up in cTRU</h1>
        <SignUp {...props} />
      </div>
    </div>
  );
}
