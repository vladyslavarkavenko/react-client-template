import Loadable from 'react-loadable';
import React from 'react';

// TODO: Prettify this. Make good looking loader etc.

const Loading = ({
  error,
  timedOut,
  pastDelay,
  retry,
}) => {
  if (error) {
    return (
      <div>
        <p> Error! </p>
        <button onClick={retry}> Retry </button>
      </div>
    );
  }
  if (timedOut) {
    return (
      <div>
        <p> Taking a long time... </p>
        <button onClick={retry}> Retry </button>
      </div>
    );
  }
  if (pastDelay) {
    return (
      <div className="loading"> Loading... </div>
    );
  }
  return null;
};

export default function configLoadable(opts) {
  return Loadable(Object.assign({
    loading: Loading,
    delay: 500,
    timeout: 20000,
  }, opts));
}
