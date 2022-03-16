import { Redirect } from 'react-router';
import React from 'react';

export default function withProtectedRoute<T>(
  Component: React.ComponentType<T>,
  isLoggedIn: boolean
) {
  return (hocProps: T): JSX.Element => {
    if (isLoggedIn) {
      return <Component {...hocProps} />;
    }

    return <Redirect to='/' />;
  };
}
