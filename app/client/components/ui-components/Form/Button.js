import React from 'react';
import i18next from 'i18next';
import { InlineLoader } from '../Layout/Loader';

export default function Button({
  title,
  loadingTitle = i18next.t('default.loading'),
  type = 'button',
  theme,
  className = '',
  isLoading,
  disabled,
  ...rest
}) {
  return (
    <button
      type={type}
      className={`component btn btn__submit ${isLoading ? 'is-loading' : ''} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <>
          <InlineLoader />
          {loadingTitle}
        </>
      ) : (
        title
      )}
    </button>
  );
}
