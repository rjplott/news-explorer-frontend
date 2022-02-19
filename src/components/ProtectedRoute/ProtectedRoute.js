import { Route, Redirect } from 'react-router';
import React from 'react';

export default function ProtectedRoute({ component: Component, ...props }) {
  return (
    <Route>
      {() =>
        props.isLoggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
  );
}
