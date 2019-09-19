import React from 'react';
import { Route } from 'react-router-dom';

// TODO: Make different other pages
export default function WrappedRoute(props) {
  return (
    <>
      <Route {...props} />
    </>
  );
}
