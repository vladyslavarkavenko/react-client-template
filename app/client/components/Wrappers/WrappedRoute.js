import React from 'react';
import { Route } from 'react-router-dom';

export default function WrappedRoute(props) {
  return <Route {...props} />;
}
