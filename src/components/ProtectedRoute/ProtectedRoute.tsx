import { Route, Redirect } from 'react-router';
import React, { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function ProtectedRoute<T>(
  Component: React.ComponentType<T>
): React.FC<T> {
  const user = useContext(CurrentUserContext);

  return (props: T) => {
    return (
      <Route>
        {() => (user.name ? <Component {...props} /> : <Redirect to='/' />)}
      </Route>
    );
  };
}
